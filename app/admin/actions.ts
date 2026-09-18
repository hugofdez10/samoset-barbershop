"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/types";

async function authenticatedClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return supabase;
}

export async function setBookingStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as BookingStatus;

  if (!id || !["pending", "accepted", "rejected"].includes(status)) {
    return;
  }

  const supabase = await authenticatedClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Could not update booking:", error);
    return;
  }

  revalidatePath("/admin");
}

export async function deleteBooking(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;

  const supabase = await authenticatedClient();
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error("Could not delete booking:", error);
    return;
  }

  revalidatePath("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
