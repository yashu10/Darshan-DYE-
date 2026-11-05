import { Fragment } from "react";
import { Icon } from "@/components/ui/Icon";
import { ADDRESS_LINES, CONTACTS, MAP_DIRECTIONS_URL, MAP_EMBED_URL, SITE } from "@/data/site";

/** The address, phone, email and IndiaMART cards next to the enquiry form. */
export function ContactCards() {
  return (
    <div className="info-cards">
      <div className="i-card reveal">
        <div className="ico">
          <Icon name="pin" />
        </div>
        <div>
          <b>Address</b>
          <span>
            {ADDRESS_LINES.map((line, index) => (
              <Fragment key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </span>
        </div>
      </div>
      <div className="i-card reveal">
        <div className="ico">
          <Icon name="user" />
        </div>
        <div>
          <b>Contact person</b>
          <span>{SITE.founder.name}</span>
        </div>
      </div>
      <div className="i-card reveal">
        <div className="ico">
          <Icon name="phone" />
        </div>
        <div>
          <b>Phone / WhatsApp</b>
          <ul className="cl">
            {CONTACTS.map((contact) => (
              <li key={contact.phoneTel}>
                <a href={`tel:${contact.phoneTel}`}>{contact.phoneDisplay}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="i-card reveal">
        <div className="ico">
          <Icon name="mail" />
        </div>
        <div>
          <b>Email</b>
          <ul className="cl">
            {CONTACTS.map((contact) => (
              <li key={contact.email}>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="i-card reveal">
        <div className="ico">
          <Icon name="globe" />
        </div>
        <div>
          <b>Also find us on</b>
          <a href={SITE.indiamartUrl} target="_blank" rel="noopener">
            IndiaMART profile
          </a>
        </div>
      </div>
    </div>
  );
}

/** Embedded Google Map and a "Get directions" button. */
export function LocationMap() {
  return (
    <>
      <div className="map reveal">
        <iframe
          title="Map showing Darshan Dye-Chem, Vatva GIDC, Ahmedabad"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={MAP_EMBED_URL}
        />
      </div>
      <p className="reveal action-row action-row--tight">
        <a className="btn btn-navy" target="_blank" rel="noopener" href={MAP_DIRECTIONS_URL}>
          Get directions
        </a>
      </p>
    </>
  );
}
