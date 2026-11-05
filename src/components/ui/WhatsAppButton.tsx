import { WHATSAPP_CHAT } from "@/data/site";

const href = `https://wa.me/${WHATSAPP_CHAT.number}?text=${encodeURIComponent(WHATSAPP_CHAT.message)}`;

/** Floating button that opens a WhatsApp chat with Archit Patel. */
export function WhatsAppButton() {
  return (
    <a className="wa-float" href={href} target="_blank" rel="noopener noreferrer" aria-label={WHATSAPP_CHAT.label}>
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.04 3C9.4 3 4 8.4 4 15.03c0 2.12.55 4.19 1.6 6.01L4 29l8.14-1.56a12.04 12.04 0 0 0 3.9.65C22.68 28.09 28 22.7 28 16.07 28 9.4 22.68 3 16.04 3zm0 22.1c-1.2 0-2.38-.2-3.5-.6l-.5-.18-4.83.93.95-4.7-.2-.5a9.07 9.07 0 0 1-1.4-4.9c0-5.04 4.1-9.14 9.2-9.14 5.02 0 9.12 4.1 9.12 9.14 0 5.04-4.1 9.15-8.84 9.15zm5.04-6.87c-.28-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.19-.32.21-.6.07-.27-.14-1.16-.43-2.2-1.36a8.2 8.2 0 0 1-1.52-1.9c-.16-.27-.02-.42.12-.56.13-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.19.05-.35-.02-.5-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.35-.25.27-.96.94-.96 2.3s.99 2.67 1.13 2.85c.14.19 1.95 2.98 4.72 4.17.66.29 1.18.46 1.58.59.66.21 1.27.18 1.75.11.53-.08 1.63-.67 1.86-1.31.23-.64.23-1.19.16-1.31-.07-.12-.25-.19-.53-.33z"
        />
      </svg>
      <span className="wa-tip" aria-hidden="true">
        Chat on WhatsApp
      </span>
    </a>
  );
}
