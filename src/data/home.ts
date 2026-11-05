import type { IconName } from "@/components/ui/Icon";
import { DYES } from "./dyes";
import { IMAGES, type SiteImage } from "./images";
import { ROUTES } from "./site";

export const HERO_IMAGES = [
  "/assets/img/dye-yarns.jpg",
  "/assets/img/hero-silk.jpg",
  "/assets/img/hero-powder.jpg",
  "/assets/img/hero-colour.jpg"
] as const;

export const WHY_BUYERS: readonly { icon: IconName; title: string; text: string }[] = [
  { icon: "drop", title: "Consistent shades", text: "Repeatable batches so your next order matches the last one." },
  { icon: "factory", title: "Direct from factory", text: "Manufacturer pricing for wholesale and bulk buyers." },
  { icon: "globe", title: "Export ready", text: "Packing and documentation support for overseas orders." },
  { icon: "flask", title: "Sample first", text: "Test on your own process before placing a bulk order." }
];

const countOf = (family: "acid" | "direct") => DYES.filter((dye) => dye.family === family).length;

export const PRODUCT_CATEGORIES: readonly { title: string; detail: string; href: string; image: SiteImage }[] = [
  { title: "Acid Dyes", detail: `${countOf("acid")} shades`, href: `${ROUTES.products}?f=acid#explorer`, image: IMAGES.textile },
  { title: "Direct Dyes", detail: `${countOf("direct")} shades`, href: `${ROUTES.products}?f=direct#explorer`, image: IMAGES.powders },
  { title: "Other Colourants", detail: "9 products", href: `${ROUTES.products}#other`, image: IMAGES.labPurple }
];

export const PROCESS_STEPS: readonly { title: string; text: string }[] = [
  { title: "Share your need", text: "Dye, shade, quantity and destination." },
  { title: "Get a quote", text: "Clear pricing and lead time from our team." },
  { title: "Approve a sample", text: "Test on your process before bulk." },
  { title: "We dispatch", text: "Packed and shipped across India and overseas." }
];

/** Photos in the "Industries we serve" gallery. `shape` picks the grid cell (see `.gallery` in globals.css). */
export const INDUSTRY_PHOTOS: readonly { image: SiteImage; alt: string; caption: string; shape?: "wide" | "tall" }[] = [
  { image: IMAGES.textile, alt: "Vivid dye powder in a range of colours", caption: "Colour and shade range", shape: "wide" },
  { image: IMAGES.dyeIndigo, alt: "Indigo-dyed cloth hanging to dry in the sun", caption: "Textile dyeing", shape: "tall" },
  { image: IMAGES.labPipette, alt: "Scientist using a pipette in a laboratory", caption: "Shade matching" },
  { image: IMAGES.labBeaker, alt: "Gloved hand holding a laboratory beaker", caption: "Quality testing" },
  { image: IMAGES.dyeSilk, alt: "Dyed silk fabric in pink, blue and green", caption: "Silk and fabric colouring", shape: "wide" }
];

export const STATS: readonly { value: string; label: string }[] = [
  { value: String(DYES.length), label: "Shades in our shade cards" },
  { value: "11 yrs", label: "Trusted on IndiaMART" },
  { value: "2017", label: "GST registered since" },
  { value: "3", label: "Core dye families" }
];
