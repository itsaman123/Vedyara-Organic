declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function initGA() {
  if (!GA_ID) return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  // send_page_view: false — we fire page_view manually on each route change
  window.gtag("config", GA_ID, { send_page_view: false });
}

export function trackPageView(path: string, title?: string) {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
  });
}

export function trackPurchase(params: {
  orderId: string;
  orderNumber: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
}) {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", "purchase", {
    transaction_id: params.orderNumber || params.orderId,
    value: params.totalAmount,
    currency: "INR",
    payment_type: "COD",
    items: params.items.map((item, i) => ({
      item_id: String(i),
      item_name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
  });
}
