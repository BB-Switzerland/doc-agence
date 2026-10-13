import React, { useState, useMemo } from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

const ALL_IKE_EVENTS = [
  "ike_home_view", "ike_event_view", "ike_date_view", "ike_abo_view",
  "ike_abo_selection", "ike_user_login", "ike_user_logout", "ike_cart_add",
  "ike_cart_view", "ike_cart_update", "ike_cart_delete", "ike_cart_empty",
  "ike_cart_confirm", "ike_cart_delivery_view", "ike_cart_form_view",
  "ike_cart_payment_view", "ike_cart_payment_changed",
  "ike_cart_payment_launched", "ike_cart_payment_success", "ike_page_changed",
];

const CSP_RULES = [
  { directive: "connect-src", url: "https://www.facebook.com" },
  { directive: "connect-src", url: "https://connect.facebook.net" },
  {
    directive: "script-src-elem",
    url: "https://capi-automation.s3.us-east-2.amazonaws.com",
  },
];

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

  bridge: () => `<script>
(function () {
  if (window.__bbIkeBridge) return;
  window.__bbIkeBridge = true;
  window.dataLayer = window.dataLayer || [];

  var EVENTS = ${JSON.stringify(ALL_IKE_EVENTS)};
  var ECOM = { ike_event_view: 1, ike_date_view: 1, ike_cart_add: 1, ike_cart_confirm: 1, ike_cart_payment_launched: 1, ike_cart_payment_success: 1 };

  function num(v) {
    if (v === undefined || v === null || v === '') return undefined;
    var n = parseFloat(String(v).replace(/[^0-9,.\\-]/g, '').replace(',', '.'));
    return isNaN(n) ? undefined : n;
  }
  function firstKey(o) { for (var k in o) { if (o.hasOwnProperty(k)) return k; } return null; }

  function handle(name, d) {
    d = d || {};
    var currency = (d.currency && d.currency.name) || undefined;
    var value = num(d.topaid);
    var txId = d.id || d.uuid;
    var items = [];
    var firstName, firstDate, tariffName;
    if (d.tariffs) { var tk = firstKey(d.tariffs); if (tk && d.tariffs[tk].language) tariffName = d.tariffs[tk].language.name; }
    if (d.events) {
      for (var k in d.events) {
        if (!d.events.hasOwnProperty(k)) continue;
        var ev = d.events[k] || {};
        var evName = (ev.language && ev.language.name) || undefined;
        if (!firstName) { firstName = evName; firstDate = ev.dateISO || ev.date; }
        items.push({ item_id: String(ev.id || k), item_name: evName, item_category: 'Billetterie', item_variant: tariffName, quantity: ev.ticketscount || 1 });
      }
    }
    if (!firstName && d.name) firstName = d.name;
    if (!items.length && firstName) items.push({ item_name: firstName, item_category: 'Billetterie' });

    if (name === 'ike_cart_payment_success' && txId) {
      try {
        var key = 'bb_ike_done_' + txId;
        if (window.sessionStorage.getItem(key)) return;
        window.sessionStorage.setItem(key, '1');
      } catch (e) {}
    }

    var push = {
      event: name,
      ike_name: firstName,
      ike_date: firstDate || d.date,
      ike_value: value,
      ike_currency: currency,
      ike_quantity: d.ticketscount,
      ike_transaction_id: name === 'ike_cart_payment_success' ? (txId ? String(txId) : undefined) : undefined,
      ike_path: d.path
    };
    if (ECOM[name]) {
      window.dataLayer.push({ ecommerce: null });
      push.ecommerce = { currency: currency, value: value, transaction_id: push.ike_transaction_id, items: items };
    }
    window.dataLayer.push(push);
  }

  for (var i = 0; i < EVENTS.length; i++) {
    (function (n) {
      document.addEventListener(n, function (e) { try { handle(n, e && e.detail); } catch (x) {} });
    })(EVENTS[i]);
  }
})();
</script>`,

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
      event_category: e.detail && e.detail.name,
      event_label: e.detail && e.detail.date,
    });
  });`);
    }
    if (events.add_to_cart) {
      blocks.push(`  document.addEventListener("ike_cart_add", function () {
    gtag("event", "add_to_cart");
  });`);
    }
    if (events.begin_checkout) {
      blocks.push(`  document.addEventListener("ike_cart_confirm", function () {
    gtag("event", "begin_checkout");
  });`);
    }
    if (events.add_payment_info) {
      blocks.push(`  document.addEventListener("ike_cart_payment_launched", function (e) {
    gtag("event", "add_payment_info", {
      currency: e.detail.currency.name,
      value: e.detail.topaid,
    });
  });`);
    }
    if (events.purchase) {
      blocks.push(`  document.addEventListener("ike_cart_payment_success", function (e) {
    gtag("event", "purchase", {
      transaction_id: String(e.detail.id || e.detail.uuid || ""),
      currency: e.detail.currency.name,
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

const IKE_DIRECT_EVENTS = [
  { key: "view_item", label: "ike_event_view → view_item" },
  { key: "add_to_cart", label: "ike_cart_add → add_to_cart" },
  { key: "begin_checkout", label: "ike_cart_confirm → begin_checkout" },
  { key: "add_payment_info", label: "ike_cart_payment_launched → add_payment_info" },
  { key: "purchase", label: "ike_cart_payment_success → purchase" },
];

export default function InfomaniakTrackingConfigurator() {
  const [mode, setMode] = useState("gtm");

  const [gtmId, setGtmId] = useState("");
  const [usesMeta, setUsesMeta] = useState(true);

  const [enableGa4, setEnableGa4] = useState(true);
  const [enablePixel, setEnablePixel] = useState(true);
  const [enableIke, setEnableIke] = useState(true);
  const [ga4Id, setGa4Id] = useState("");
  const [pixelId, setPixelId] = useState("");
  const [events, setEvents] = useState({
    view_item: true,
    add_to_cart: true,
    begin_checkout: true,
    add_payment_info: true,
    purchase: true,
  });

  const isGtm = mode === "gtm";
  const showCsp = isGtm ? usesMeta : enablePixel;

  const headCode = useMemo(() => {
    if (isGtm) return gtmId.trim() ? SNIPPETS.gtm(gtmId.trim()) : "";
    const parts = [];
    if (enableGa4 && ga4Id.trim()) parts.push(SNIPPETS.ga4(ga4Id.trim()));
    if (enablePixel && pixelId.trim()) parts.push(SNIPPETS.pixel(pixelId.trim()));
    if (enableIke) {
      const ike = SNIPPETS.ikeEvents(enableGa4 ? "" : ga4Id.trim(), events);
      if (ike) parts.push(ike);
    }
    return parts.join("\n\n");
  }, [isGtm, gtmId, enableGa4, enablePixel, enableIke, ga4Id, pixelId, events]);

  const warnings = useMemo(() => {
    const w = [];
    if (isGtm) {
      if (!gtmId.trim()) w.push("Renseigne l'ID GTM (format GTM-XXXXXXX).");
      return w;
    }
    w.push("Mode sans GTM : aucune gestion du consentement. À réserver aux cas sans RGPD ni nLPD.");
    if (enableGa4 && !ga4Id.trim()) w.push("Renseigne l'ID GA4 (format G-XXXXXXX).");
    if (enablePixel && !pixelId.trim()) w.push("Renseigne l'ID Meta Pixel (numérique).");
    if (enableIke && !ga4Id.trim() && Object.values(events).some(Boolean))
      w.push("Les évènements ike_ utilisent gtag() : renseigne un ID GA4.");
    if (enableIke && !Object.values(events).some(Boolean))
      w.push("Sélectionne au moins un évènement Infomaniak.");
    return w;
  }, [isGtm, gtmId, enableGa4, enablePixel, enableIke, ga4Id, pixelId, events]);

  const toggleEvent = (k) => setEvents((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.modeRow}>
        <label className={styles.modeOption}>
          <input type="radio" name="ik-mode" checked={isGtm} onChange={() => setMode("gtm")} />
          <span>Via GTM (recommandé)</span>
        </label>
        <label className={styles.modeOption}>
          <input type="radio" name="ik-mode" checked={!isGtm} onChange={() => setMode("direct")} />
          <span>Scripts directs (sans GTM)</span>
        </label>
      </div>

      {isGtm ? (
        <div className={styles.grid}>
          <fieldset className={styles.field}>
            <div className={styles.fieldTitle}>Google Tag Manager</div>
            <input
              type="text"
              placeholder="GTM-XXXXXXX"
              value={gtmId}
              onChange={(e) => setGtmId(e.target.value)}
              className={styles.input}
            />
          </fieldset>
          <fieldset className={styles.field}>
            <label className={styles.toggleRow}>
              <input type="checkbox" checked={usesMeta} onChange={(e) => setUsesMeta(e.target.checked)} />
              <span>Le client utilise Meta Pixel</span>
            </label>
            <p className={styles.hint}>Affiche les exceptions CSP à ajouter dans Infomaniak.</p>
          </fieldset>
        </div>
      ) : (
        <div className={styles.grid}>
          <fieldset className={styles.field}>
            <label className={styles.toggleRow}>
              <input type="checkbox" checked={enableGa4} onChange={(e) => setEnableGa4(e.target.checked)} />
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
              <input type="checkbox" checked={enablePixel} onChange={(e) => setEnablePixel(e.target.checked)} />
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

          <fieldset className={`${styles.field} ${styles.fullWidth}`}>
            <label className={styles.toggleRow}>
              <input type="checkbox" checked={enableIke} onChange={(e) => setEnableIke(e.target.checked)} />
              <span>Évènements Infomaniak (ike_) vers GA4</span>
            </label>
            <div className={styles.events}>
              {IKE_DIRECT_EVENTS.map((ev) => (
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
      )}

      {warnings.length > 0 && (
        <ul className={styles.warnings}>
          {warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      )}

      <div className={styles.outputHeader}>
        <strong>1. Infomaniak</strong> : Développeur &gt; Code HTML placé dans le head
      </div>
      <CodeBlock language="html" showLineNumbers>
        {headCode || "<!-- Renseigne au moins un ID. -->"}
      </CodeBlock>

      {isGtm && (
        <>
          <div className={styles.outputHeader}>
            <strong>2. GTM</strong> : balise HTML personnalisé « Billetterie - Pont ike_* vers dataLayer »,
            déclencheur Page View avec <code>Page Hostname</code> contient <code>infomaniak.events</code>,
            une fois par page
          </div>
          <CodeBlock language="html" showLineNumbers>
            {SNIPPETS.bridge()}
          </CodeBlock>
        </>
      )}

      {showCsp && (
        <>
          <div className={styles.outputHeader}>
            <strong>{isGtm ? "3" : "2"}. Infomaniak</strong> : Développeur &gt; Politique de sécurité du contenu (CSP) &gt; Ajouter une exception
          </div>
          <table className={styles.cspTable}>
            <thead>
              <tr>
                <th>Directive</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {CSP_RULES.map((r, i) => (
                <tr key={i}>
                  <td><code>{r.directive}</code></td>
                  <td><code>{r.url}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}