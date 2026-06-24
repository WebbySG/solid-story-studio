import { MessageCircle } from "lucide-react";

const PHONE = "6590721618";
const MESSAGE = "Hi APdS Architects, I'd like to enquire about your architecture and interior design services.";

export function WhatsAppWidget() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all hover:scale-110 hover:shadow-xl"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M19.11 17.27c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.94 2.96 4.7 4.15.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.02 5.33C10.13 5.33 5.34 10.12 5.34 16c0 1.88.49 3.71 1.43 5.33L5.33 26.67l5.49-1.44a10.66 10.66 0 0 0 5.19 1.34h.01c5.88 0 10.67-4.79 10.67-10.67 0-2.85-1.11-5.53-3.13-7.55a10.6 10.6 0 0 0-7.54-3.12zm0 19.55a8.86 8.86 0 0 1-4.52-1.24l-.32-.19-3.26.85.87-3.18-.21-.33a8.84 8.84 0 0 1-1.36-4.79c0-4.89 3.98-8.87 8.87-8.87 2.37 0 4.6.92 6.27 2.6a8.81 8.81 0 0 1 2.6 6.28c0 4.89-3.98 8.87-8.87 8.87z"/>
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-foreground px-3 py-2 text-xs text-background opacity-0 shadow-md transition-opacity group-hover:opacity-100">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
