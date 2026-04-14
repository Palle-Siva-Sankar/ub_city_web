export interface EntertainmentAttraction {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  ctaLabel: string;
}

export const ENTERTAINMENT_ATTRACTIONS: EntertainmentAttraction[] = [
  {
    slug: "flyover-america",
    title: "FlyOver America",
    subtitle: "Immersive Flight Theater",
    description:
      "A breathtaking flight simulation attraction that takes guests soaring over iconic landscapes with wind, sound, and motion effects.",
    heroImage: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1600",
    ctaLabel: "Book Experience",
  },
  {
    slug: "cmx-cinemas",
    title: "CMX Cinemas",
    subtitle: "Premium Recliner Experience",
    description:
      "Enjoy premium movie screenings with reclining seats, gourmet food, and immersive sound designed for a world-class cinema outing.",
    heroImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600",
    ctaLabel: "View Show Details",
  },
  {
    slug: "crayola-experience",
    title: "Crayola Experience",
    subtitle: "Creative Family Zone",
    description:
      "Interactive creative zones for families and kids featuring colorful workshops, hands-on activities, and playful discovery spaces.",
    heroImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1600",
    ctaLabel: "Plan Family Visit",
  },
];

export function getAttractionBySlug(slug: string) {
  return ENTERTAINMENT_ATTRACTIONS.find((item) => item.slug === slug);
}

