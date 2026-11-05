import { SITE } from "@/data/site";

export interface EnquiryFields {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}

const TIMEOUT_MS = 15000;

/** Web3Forms is used when a key is set; FormSubmit (formsubmit.co) is the fallback. No server of our own is needed. */
function request(fields: EnquiryFields): { url: string; body: Record<string, unknown> } {
  const subject = `New dye enquiry from the ${SITE.name} website`;
  if (SITE.web3formsKey) {
    return {
      url: "https://api.web3forms.com/submit",
      body: { access_key: SITE.web3formsKey, subject, from_name: `${SITE.name} website`, replyto: fields.email, ...fields }
    };
  }
  return {
    url: `https://formsubmit.co/ajax/${SITE.enquiryRecipient}`,
    body: { ...fields, _subject: subject, _cc: SITE.enquiryCc, _template: "table", _captcha: "false" }
  };
}

/** Resolves true only when the email service confirms delivery. */
export async function sendEnquiry(fields: EnquiryFields): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const { url, body } = request(fields);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
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
