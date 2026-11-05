import type { IconName } from "@/components/ui/Icon";
import { DYES } from "./dyes";

export const VALUES: readonly { icon: IconName; title: string; text: string }[] = [
  { icon: "shield", title: "Reliability", text: "Dependable quality and on-time dispatch so your production never waits on colour." },
  { icon: "drop", title: "Consistency", text: "Shade-to-shade repeatability is the first thing dye buyers ask about, and the first thing we protect." },
  { icon: "truck", title: "Service", text: "Quick quotes, samples on request and supply to buyers across India and overseas." }
];

export const COMPANY_FACTS: readonly { label: string; value: string }[] = [
  { label: "Nature of business", value: "Manufacturer" },
  { label: "Also", value: "Wholesale & Retail" },
  { label: "Leadership", value: "Girish Patel" },
  { label: "Legal status", value: "Proprietorship" },
  { label: "Location", value: "Ahmedabad, Gujarat" },
  { label: "GST registration", value: "2017" },
  { label: "GST No.", value: "24ALMPP2816Q1ZI" }
];

export const TIMELINE: readonly { year: string; title: string; text: string }[] = [
  { year: "2000", title: "The beginning", text: "The first reactor kettle is fired up in a modest shed in Vatva GIDC, Ahmedabad, with a simple promise: dependable dyes and honest advice." },
  { year: "2015", title: "Going online", text: "We list our range on IndiaMART and begin serving buyers beyond our local market." },
  { year: "2017", title: "GST registered", text: "The business is formally registered under GST, strengthening trust with wholesale and corporate buyers." },
  { year: "Today", title: `${DYES.length} shades`, text: "Acid dyes, direct dyes and specialty colourants, supplied wholesale and in bulk across India." },
  { year: "Next", title: "Going global", text: "Our goal is to take Darshan Dye-Chem to more overseas buyers in the years ahead." }
];

/** `initials` is shown instead of an icon when set. */
export const TEAM: readonly { name: string; role: string; text: string; icon?: IconName; initials?: string }[] = [
  { name: "Girish Patel", role: "Proprietor", initials: "GP", text: "Leads the company and works directly with buyers on pricing, samples and supply." },
  { name: "Production & Quality", role: "Manufacturing team", icon: "flask", text: "Runs batches and checks shade consistency before material leaves the factory." },
  { name: "Sales & Export Desk", role: "Customer support", icon: "globe", text: "Handles quotations, samples and enquiries from India and overseas." },
  { name: "Packing & Dispatch", role: "Logistics team", icon: "truck", text: "Packs and ships orders so they reach you on time and in good condition." }
];

export const COMMITMENTS: readonly { title: string; text: string }[] = [
  { title: "Quick quotes", text: "Send your requirement and hear back with pricing." },
  { title: "Samples on request", text: "Trial your shade before a bulk order." },
  { title: "Bulk & wholesale", text: "Supply sized to your production needs." },
  { title: "Honest advice", text: "We tell you if a dye is not right for your material." }
];

export const FOUNDER_MESSAGE = {
  heading: "“Every shade is a promise of consistency.”",
  paragraphs: [
    "In the summer of 2000, we fired up our very first reactor kettle in a modest shed here in Phase-II, Vatva GIDC. Back then, color chemistry was highly personal and hands-on. I spent my days standing by the washing basins, hand-matching color coordinates for local cotton and silk printers who needed reliability.",
    "Over the last 25 years, our operations have scaled and our laboratories have modernized with digital spectrophotometers. However, the human craftsmanship behind the chemistry remains unchanged. We don't just ship bulk chemicals; we design solutions that ensure your textile fibers and copy paper shades look absolutely perfect, batch after batch.",
    "Thank you for trusting us with your color needs. We welcome you to collaborate with our lab technicians for custom formulations."
  ]
} as const;

/** Years since the first reactor kettle (summer 2000). Shown in the milestone timeline. */
export const YEARS_IN_BUSINESS = 25;
