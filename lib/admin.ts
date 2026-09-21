import type { User } from "@supabase/supabase-js";

// Only users whose app_metadata.role is "admin" can use the dashboard.
// app_metadata can only be changed with SQL or the service role, never by the user.
export function isAdmin(user: User | null): user is User {
  return user?.app_metadata?.role === "admin";
}
