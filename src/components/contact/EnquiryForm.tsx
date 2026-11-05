"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { PRODUCT_OPTIONS } from "@/data/products";
import { enquiryText, sendEnquiry, whatsappLink } from "@/lib/enquiry";

const EMPTY = { name: "", company: "", email: "", phone: "", product: "", message: "" };
type Values = typeof EMPTY;
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const validate = (values: Values): Errors => {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email, for example name@company.com.";
  }
  if (!values.message.trim()) errors.message = "Please describe what you need.";
  return errors;
};

interface Status {
  text: string;
  /** WhatsApp link with the enquiry typed in, shown after the message. */
  whatsapp: string;
}

/**
 * Enquiry form. The enquiry is emailed to the team; if sending fails the visitor gets a WhatsApp
 * link with the enquiry already typed in, so a request is never lost.
 */
export function EnquiryForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

  const prefill = useCallback((product: string, message: string) => {
    setValues((current) => ({ ...current, ...(product ? { product } : {}), ...(message ? { message } : {}) }));
  }, []);

  const bind = (field: keyof Values) => ({
    value: values[field],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }))
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (["name", "email", "message"] as const).find((field) => found[field]);
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid === "message" ? "msg" : firstInvalid}"]`)?.focus();
      return;
    }
    // Hidden spam-trap field: only bots fill it in.
    if (new FormData(event.currentTarget).get("_honey")) return;

    const whatsapp = whatsappLink(enquiryText(values));
    setSending(true);
    const sent = await sendEnquiry(values);
    setSending(false);

    if (sent) {
      setValues(EMPTY);
      setStatus({ text: "Thank you. Your enquiry has been sent and our team will contact you soon.", whatsapp });
    } else {
      setStatus({ text: "Sorry, we could not send your enquiry. Please send it on WhatsApp or call us.", whatsapp });
    }
  };

  return (
    <form id="enq" noValidate className="reveal" onSubmit={onSubmit}>
      <Suspense fallback={null}>
        <PrefillFromUrl onPrefill={prefill} />
      </Suspense>
      <h2>Send an enquiry</h2>
      <div className="fld">
        <label htmlFor="name">Your name *</label>
        <input id="name" name="name" autoComplete="name" required aria-describedby="e-name" aria-invalid={Boolean(errors.name)} {...bind("name")} />
        <span className="err" id="e-name">{errors.name ?? ""}</span>
      </div>
      <div className="fld">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" autoComplete="organization" {...bind("company")} />
      </div>
      <div className="fld">
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" autoComplete="email" required aria-describedby="e-email" aria-invalid={Boolean(errors.email)} {...bind("email")} />
        <span className="err" id="e-email">{errors.email ?? ""}</span>
      </div>
      <div className="fld">
        <label htmlFor="phone">Phone / WhatsApp</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" {...bind("phone")} />
      </div>
      <div className="fld full">
        <label htmlFor="product">Product of interest</label>
        <select id="product" name="product" {...bind("product")}>
          <option value="">Select a dye (optional)</option>
          {PRODUCT_OPTIONS.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
      <div className="fld full">
        <label htmlFor="msg">Requirement *</label>
        <textarea
          id="msg"
          name="msg"
          required
          placeholder="Shade, quantity, destination country..."
          aria-describedby="e-msg"
          aria-invalid={Boolean(errors.message)}
          {...bind("message")}
        />
        <span className="err" id="e-msg">{errors.message ?? ""}</span>
      </div>
      <input type="text" name="_honey" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="fld full">
        <button className="btn btn-amber" type="submit" disabled={sending}>
          {sending ? "Sending…" : "Send enquiry"}
        </button>
      </div>
      <p className="form-msg" id="formMsg" role="status" aria-live="polite">
        {status ? (
          <>
            {status.text}{" "}
            <a href={status.whatsapp} target="_blank" rel="noopener">
              Chat on WhatsApp
            </a>
          </>
        ) : null}
      </p>
    </form>
  );
}

/** Fills the form from ?product=... and ?msg=... (links from the product cards and the dye calculator). */
function PrefillFromUrl({ onPrefill }: { onPrefill: (product: string, message: string) => void }) {
  const params = useSearchParams();
  const product = params.get("product") ?? "";
  const message = params.get("msg") ?? "";

  useEffect(() => {
    onPrefill(product, message);
  }, [product, message, onPrefill]);

  return null;
}
