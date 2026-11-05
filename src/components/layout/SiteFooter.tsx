import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { CONTACTS, FULL_ADDRESS, NAV_LINKS, ROUTES, SITE } from "@/data/site";

const PRODUCT_LINKS = [
  { href: `${ROUTES.products}?f=acid#explorer`, label: "Acid Dyes" },
  { href: `${ROUTES.products}?f=direct#explorer`, label: "Direct Dyes" },
  { href: `${ROUTES.products}#other`, label: "Other Colourants" },
  { href: `${ROUTES.products}#explorer`, label: "Shade Explorer" },
  { href: `${ROUTES.products}#shadecards`, label: "Download Shade Cards" },
  { href: ROUTES.tools, label: "Dye Tools" }
] as const;

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap f-grid">
        <div>
          <Brand />
          <p className="footer-about">
            Acid dyes, direct dyes and specialty colourants, manufactured in Ahmedabad and supplied across India and overseas.
          </p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Products</h4>
          <ul>
            {PRODUCT_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <address>
            <ul>
              <li>{FULL_ADDRESS}</li>
            </ul>
          </address>
          {CONTACTS.map((contact) => (
            <div key={contact.email}>
              <p className="fp">{contact.name}</p>
              <ul className="cl">
                <li>
                  <a href={`tel:${contact.phoneTel}`}>
                    <Icon name="phone" size={16} />
                    <span>{contact.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`}>
                    <Icon name="mail" size={16} />
                    <span>{contact.email}</span>
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="wrap f-bottom">
        <span>
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </span>
        <span>GST {SITE.gstNumber}</span>
      </div>
    </footer>
  );
}
