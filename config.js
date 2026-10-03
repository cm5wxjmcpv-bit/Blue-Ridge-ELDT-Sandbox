// ==============================
// BLUE RIDGE ELDT SITE CONFIG
// ==============================

// Independent Blue Ridge Google Apps Script deployment.
const APP_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzqytd2bkdcVGVAit-uX0DAJ5waaYuYNqP9B6ZaeArX1S3OExvUQ6j_XfQA3NKCJ_pA/exec";

// Backward compatibility.
const SHEETS_API_URL = APP_SCRIPT_URL;

const BUSINESS_NAME = "Blue Ridge Entry Level Driver Training";
const BUSINESS_SHORT_NAME = "Blue Ridge ELDT";
const BUSINESS_TAGLINE = "ELDT Compliance Training";

// ==============================
// DEFAULT CLASS A/B MODULES
// Matches the current Martinsville CDL curriculum.
// The live Google Sheet remains authoritative.
// ==============================

const MODULES = [
  {
    id: 1,
    title: "Module 1 — Introduction",
    youtubeId: "-qXt8htJ9h4"
  },
  {
    id: 2,
    title: "Module 2 — Safety & Inspection",
    youtubeId: "RS4K5FCL988"
  },
  {
    id: 3,
    title: "Module 3 — Basic Operations",
    youtubeId: "TLeq0WikSmU"
  },
  {
    id: 4,
    title: "Module 4 — Advanced Driving",
    youtubeId: "cMML4tQdVvY"
  }
];

// Percent of video required before completion.
const REQUIRED_WATCH_PERCENT = 0.9;

// ==============================
// BUSINESS BRANDING LAYER
// Keeps the copied portal code separate from the city-facing branding
// without duplicating the same wording across every page.
// ==============================

function applyBusinessBranding() {
  if (document.body && !document.getElementById("sandbox-environment-banner")) {
    const banner = document.createElement("div");
    banner.id = "sandbox-environment-banner";
    banner.textContent = "SANDBOX TEST SITE — NO LIVE PAYMENTS OR LIVE STUDENT DATA";
    banner.style.cssText = "position:relative;z-index:99999;background:#7f1d1d;color:white;padding:10px 16px;text-align:center;font:700 14px/1.3 system-ui,sans-serif;letter-spacing:.04em;";
    document.body.insertBefore(banner, document.body.firstChild);
  }
  const replacements = [
    ["Martinsville CDL Training Admin", "Blue Ridge ELDT Training Admin"],
    ["Martinsville CDL Program", BUSINESS_NAME],
    ["CDL Training Portal", "Blue Ridge ELDT Training Portal"]
  ];

  let title = document.title || "";
  replacements.forEach(([from, to]) => {
    title = title.split(from).join(to);
  });
  document.title = title;

  if (document.body) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parentTag = node.parentElement ? node.parentElement.tagName : "";
      if (parentTag === "SCRIPT" || parentTag === "STYLE") continue;
      let value = node.nodeValue || "";
      replacements.forEach(([from, to]) => {
        value = value.split(from).join(to);
      });
      node.nodeValue = value;
    }

    document.querySelectorAll(".brand-logo").forEach((logo) => {
      logo.innerHTML = '<div class="brand-fallback" aria-label="Blue Ridge Entry Level Driver Training">BR</div>';
    });
  }

  const style = document.createElement("style");
  style.textContent = ".hero-card::after,.hero::after{background-image:none!important;}";
  document.head.appendChild(style);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyBusinessBranding);
} else {
  applyBusinessBranding();
}
