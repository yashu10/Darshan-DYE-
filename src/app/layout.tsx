import type { Metadata, Viewport } from "next";
import { Caveat, Michroma, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PAGE_SEO } from "@/data/seo";
import { SITE } from "@/data/site";
import "./globals.css";

/** Fonts are self-hosted by next/font at build time: no request to Google Fonts, no layout shift. */
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-poppins" });
const michroma = Michroma({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-michroma" });
const caveat = Caveat({ subsets: ["latin"], weight: "600", display: "swap", variable: "--font-caveat" });

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: PAGE_SEO.home.absoluteTitle, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "business",
  // The numbers on the site are explicit tel: links already; stop iOS from auto-linking other digits.
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
  },
  verification: {
    google: googleVerification || undefined,
    other: bingVerification ? { "msvalidate.01": bingVerification } : undefined
  }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

/** Marks the page as "JavaScript is running" before first paint, so scroll animations only hide content when they can reveal it. */
const MARK_JS = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={SITE.language} className={`${poppins.variable} ${michroma.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MARK_JS }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealOnScroll />
        <WhatsAppButton />
      </body>
    </html>
  );
}
