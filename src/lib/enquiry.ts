import { SITE } from "@/data/site";

export interface EnquiryFields {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}

/** FormSubmit (formsubmit.co) emails the enquiry; no server of our own is needed. */
const ENDPOINT = `https://formsubmit.co/ajax/${SITE.enquiryRecipient}`;
const TIMEOUT_MS = 15000;

/** Resolves true only when the email service confirms delivery. */
export async function sendEnquiry(fields: EnquiryFields): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...fields,
        _subject: `New dye enquiry from the ${SITE.name} website`,
        _cc: SITE.enquiryCc,
        _template: "table",
        _captcha: "false"
      }),
      signal: controller.signal
    });
    const data: { success?: unknown } = await response.json().catch(() => ({}));
    return response.ok && String(data.success) === "true";
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** Plain-text copy of the enquiry, used for the WhatsApp message. */
export function enquiryText(fields: EnquiryFields): string {
  return [
    `Enquiry for ${SITE.name}`,
    `Name: ${fields.name}`,
    `Company: ${fields.company}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Product: ${fields.product}`,
    `Requirement: ${fields.message}`
  ].join("\n");
}

export const whatsappLink = (text: string): string => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
