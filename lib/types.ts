export type BookingStatus = "pending" | "accepted" | "rejected";

export type Booking = {
  id: string;
  full_name: string;
  room: string | null;
  contact: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  notes: string | null;
  status: BookingStatus;
  created_at: string;
};
