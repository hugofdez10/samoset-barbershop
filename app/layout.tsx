import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samoset Barbershop | $5 Haircuts",
  description:
    "Fresh fades and classic cuts by Hugo inside Samoset Housing. Book directly on WhatsApp.",
  applicationName: "Samoset Barbershop",
  openGraph: {
    title: "Samoset Barbershop | $5 Haircuts",
    description: "Fresh cuts. Honest price. Book directly on WhatsApp.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
