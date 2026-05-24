import type { LucideIcon } from "lucide-react";
import { Building2, Sailboat, CarFront, Plane, MapPinned } from "lucide-react";

export interface Service {
  slug: string;
  href: string;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

export const services: Service[] = [
  {
    slug: "apart-kiralama",
    href: "/apartlar",
    icon: Building2,
    titleKey: "services.apartTitle",
    descKey: "services.apartDesc",
  },
  {
    slug: "tekne-kiralama",
    href: "/tekne-kiralama",
    icon: Sailboat,
    titleKey: "services.boatTitle",
    descKey: "services.boatDesc",
  },
  {
    slug: "arac-kiralama",
    href: "/arac-kiralama",
    icon: CarFront,
    titleKey: "services.carTitle",
    descKey: "services.carDesc",
  },
  {
    slug: "vip-transfer",
    href: "/vip-transfer",
    icon: Plane,
    titleKey: "services.transferTitle",
    descKey: "services.transferDesc",
  },
  {
    slug: "turlar",
    href: "/turlar",
    icon: MapPinned,
    titleKey: "services.toursTitle",
    descKey: "services.toursDesc",
  },
];
