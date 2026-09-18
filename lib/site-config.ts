const whatsappMessage =
  "Hi Hugo! I'd like to book a $5 haircut at Samoset. What times are available?";

export const siteConfig = {
  name: "Samoset Barbershop",
  barber: "Hugo",
  location: "Samoset Housing · Queensbury, NY",
  tagline: "Fresh cuts. Samoset vibes.",
  phoneDisplay: "+34 689 499 301",
  whatsappUrl: `https://wa.me/34689499301?text=${encodeURIComponent(
    whatsappMessage,
  )}`,
  notice:
    "Appointments are requests. Your time is only confirmed after Hugo accepts it.",
  services: [
    {
      value: "classic-cut",
      name: "Classic Cut",
      description: "A clean, even haircut shaped to your style.",
      duration: "30–40 min",
    },
    {
      value: "fade",
      name: "Fade",
      description: "Low, mid or high fade with a clean finish.",
      duration: "40–50 min",
    },
  ],
  timeSlots: [
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
  ],
} as const;

export type ServiceValue = (typeof siteConfig.services)[number]["value"];
