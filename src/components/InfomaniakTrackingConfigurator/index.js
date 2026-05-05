import React, { useState, useMemo } from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

const SNIPPETS = {
  gtm: (id) => `<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "${id}");
</script>
<!-- End Google Tag Manager -->`,

  ga4: (id) => `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "${id}");
</script>`,

  pixel: (id) => `<!-- Meta Pixel Code -->
<script>
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", "${id}");
  fbq("track", "PageView");
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`,

  ikeEvents: (ga4Id, events) => {
    const blocks = [];
    if (events.view_item) {
      blocks.push(`  document.addEventListener("ike_event_view", function (e) {
    gtag("event", "view_item", {
      event_category: e.name,
      event_label: e.date,
    });
  });`);
    }
    if (events.add_to_cart) {
      blocks.push(`  document.addEventListener("ike_cart_add", function () {
    gtag("event", "add_to_cart");
  });`);
    }
    if (events.checkout_progress) {
      blocks.push(`  document.addEventListener("ike_cart_confirm", function () {
    gtag("event", "checkout_progress", {
      event_category: "valid cart",
    });
  });`);
    }
    if (events.add_payment_info) {
      blocks.push(`  document.addEventListener("ike_cart_payment_launched", function (e) {
    gtag("event", "add_payment_info", {
      event_category: "paiement",
      event_label: e.detail.currency.name,
      value: e.detail.topaid,
    });
  });`);
    }
    if (events.purchase) {
      blocks.push(`  document.addEventListener("ike_cart_payment_success", function (e) {
    gtag("event", "purchase", {
      event_category: "paiement",
      event_label: e.detail.currency.name,
      value: e.detail.topaid,
    });
  });`);
    }
    if (!blocks.length) return "";

    const header = ga4Id
      ? `  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "${ga4Id}");`
      : `  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }`;

    return `<!-- Évènements Infomaniak (ike_) -->
<script>
${header}

${blocks.join("\n\n")}
</script>
<!-- End Évènements Infomaniak -->`;
  },
};

const IKE_EVENTS = [
  { key: "view_item", label: "ike_event_view → view_item" },
  { key: "add_to_cart", label: "ike_cart_add → add_to_cart" },
  { key: "checkout_progress", label: "ike_cart_confirm → checkout_progress" },
  {
    key: "add_payment_info",
    label: "ike_cart_payment_launched → add_payment_info",
  },
  { key: "purchase", label: "ike_cart_payment_success → purchase" },
];

export default function InfomaniakTrackingConfigurator() {
  const [enableGtm, setEnableGtm] = useState(true);
  const [enableGa4, setEnableGa4] = useState(true);
  const [enablePixel, setEnablePixel] = useState(true);
  const [enableIke, setEnableIke] = useState(true);

  const [gtmId, setGtmId] = useState("");
  const [ga4Id, setGa4Id] = useState("");
  const [pixelId, setPixelId] = useState("");

  const [events, setEvents] = useState({
    view_item: true,
    add_to_cart: true,
    checkout_progress: true,
    add_payment_info: true,
    purchase: true,
  });

  const generated = useMemo(() => {
    const parts = [];
    if (enableGtm && gtmId.trim()) parts.push(SNIPPETS.gtm(gtmId.trim()));
    if (enableGa4 && ga4Id.trim()) parts.push(SNIPPETS.ga4(ga4Id.trim()));
    if (enablePixel && pixelId.trim()) parts.push(SNIPPETS.pixel(pixelId.trim()));
    if (enableIke) {
      const ikeCode = SNIPPETS.ikeEvents(
        enableGa4 ? "" : ga4Id.trim(),
        events
      );
      if (ikeCode) parts.push(ikeCode);
    }
    return parts.join("\n\n");
  }, [
    enableGtm,
    enableGa4,
    enablePixel,
    enableIke,
    gtmId,
    ga4Id,
    pixelId,
    events,
  ]);

  const warnings = useMemo(() => {
    const w = [];
    if (enableGtm && !gtmId.trim())
      w.push("Renseignez l'ID GTM (format GTM-XXXXXXX).");
    if (enableGa4 && !ga4Id.trim())
      w.push("Renseignez l'ID GA4 (format G-XXXXXXX).");
    if (enablePixel && !pixelId.trim())
      w.push("Renseignez l'ID Meta Pixel (numérique).");
    if (
      enableIke &&
      !enableGa4 &&
      !ga4Id.trim() &&
      Object.values(events).some(Boolean)
    )
      w.push(
        "Les évènements ike_ utilisent gtag(). Activez GA4 ou renseignez un ID GA4."
      );
    if (enableIke && !Object.values(events).some(Boolean))
      w.push("Sélectionnez au moins un évènement Infomaniak.");
    return w;
  }, [enableGtm, enableGa4, enablePixel, enableIke, gtmId, ga4Id, pixelId, events]);

  const toggleEvent = (k) =>
    setEvents((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <fieldset className={styles.field}>
          <label className={styles.toggleRow}>
            <input
              type="checkbox"
              checked={enableGtm}
              onChange={(e) => setEnableGtm(e.target.checked)}
            />
            <span>Google Tag Manager</span>
          </label>
          <input
            type="text"
            placeholder="GTM-XXXXXXX"
            value={gtmId}
            onChange={(e) => setGtmId(e.target.value)}
            disabled={!enableGtm}
            className={styles.input}
          />
        </fieldset>

        <fieldset className={styles.field}>
          <label className={styles.toggleRow}>
            <input
              type="checkbox"
              checked={enableGa4}
              onChange={(e) => setEnableGa4(e.target.checked)}
            />
            <span>Google Analytics 4</span>
          </label>
          <input
            type="text"
            placeholder="G-XXXXXXX"
            value={ga4Id}
            onChange={(e) => setGa4Id(e.target.value)}
            disabled={!enableGa4 && !enableIke}
            className={styles.input}
          />
        </fieldset>

        <fieldset className={styles.field}>
          <label className={styles.toggleRow}>
            <input
              type="checkbox"
              checked={enablePixel}
              onChange={(e) => setEnablePixel(e.target.checked)}
            />
            <span>Meta Pixel</span>
          </label>
          <input
            type="text"
            placeholder="377992888701966"
            value={pixelId}
            onChange={(e) => setPixelId(e.target.value)}
            disabled={!enablePixel}
            className={styles.input}
          />
        </fieldset>

        <fieldset className={styles.field}>
          <label className={styles.toggleRow}>
            <input
              type="checkbox"
              checked={enableIke}
              onChange={(e) => setEnableIke(e.target.checked)}
            />
            <span>Évènements Infomaniak (ike_)</span>
          </label>
          <div className={styles.events}>
            {IKE_EVENTS.map((ev) => (
              <label key={ev.key} className={styles.eventRow}>
                <input
                  type="checkbox"
                  checked={events[ev.key]}
                  onChange={() => toggleEvent(ev.key)}
                  disabled={!enableIke}
                />
                <code>{ev.label}</code>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {warnings.length > 0 && (
        <ul className={styles.warnings}>
          {warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      )}

      <div className={styles.outputHeader}>
        <strong>Code à coller dans Options Développeur</strong>
      </div>
      <CodeBlock language="html" showLineNumbers>
        {generated || "<!-- Activez au moins un tracker et renseignez son ID. -->"}
      </CodeBlock>
    </div>
  );
}
