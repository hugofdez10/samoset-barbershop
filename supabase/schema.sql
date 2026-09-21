-- SAMOSET BARBERSHOP DATABASE
-- Run this complete file in Supabase > SQL Editor. It is safe to run again.
--
-- Only users with app_metadata.role = 'admin' can see or manage bookings.
-- Give your own account that role (then sign out and sign in again):
--
--   update auth.users
--   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'
--   where email = 'YOUR_ADMIN_EMAIL';

create extension if not exists pgcrypto;

do $$
begin
  create type public.booking_status as enum ('pending', 'accepted', 'rejected');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 80),
  room text check (room is null or char_length(room) <= 40),
  contact text not null check (char_length(contact) between 3 and 100),
  service text not null check (char_length(service) between 2 and 160),
  appointment_date date not null,
  appointment_time time not null,
  notes text check (notes is null or char_length(notes) <= 500),
  status public.booking_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- Allow customers to describe the haircut instead of selecting a fixed service.
alter table public.bookings drop constraint if exists bookings_service_check;
alter table public.bookings
  add constraint bookings_service_check
  check (char_length(service) between 2 and 160);

-- Two pending requests may ask for the same slot, but only one can be accepted.
create unique index if not exists bookings_one_accepted_slot
  on public.bookings (appointment_date, appointment_time)
  where status = 'accepted';

create index if not exists bookings_status_date_idx
  on public.bookings (status, appointment_date, appointment_time);

alter table public.bookings enable row level security;

-- Bookings now arrive through WhatsApp, so the public cannot write here anymore.
drop policy if exists "Public can request bookings" on public.bookings;
revoke all on public.bookings from anon;

-- Earlier versions let any signed-in user manage bookings.
drop policy if exists "Authenticated admin can view bookings" on public.bookings;
drop policy if exists "Authenticated admin can update bookings" on public.bookings;
drop policy if exists "Authenticated admin can delete bookings" on public.bookings;

drop policy if exists "Admin can view bookings" on public.bookings;
create policy "Admin can view bookings"
  on public.bookings
  for select
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin can update bookings" on public.bookings;
create policy "Admin can update bookings"
  on public.bookings
  for update
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin can delete bookings" on public.bookings;
create policy "Admin can delete bookings"
  on public.bookings
  for delete
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
