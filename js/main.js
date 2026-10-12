/* Main UI logic — renders config-driven sections, nav, reveal, copy. */
(function () {
  "use strict";
  const cfg = window.SITE_CONFIG || {};
  const $ = (s, c) => (c || document).querySelector(s);

  /* ---- Footer year ---- */
  $("#year").textContent = new Date().getFullYear();

  /* ---- Profile image (optional) ---- */
  if (cfg.profileImage) {
    const img = $("#profileImg");
    img.src = cfg.profileImage;
    img.alt = (cfg.name || "Lalit Prajapat") + " profile photo";
    img.hidden = false;
    img.onload = () => { img.previousElementSibling && img.previousElementSibling.remove(); };
    img.onerror = () => { img.remove(); };
  }

  /* ---- Projects ---- */
  const grid = $("#projectGrid");
  const projects = Array.isArray(cfg.projects) ? cfg.projects : [];
  grid.innerHTML = projects.map((p) => {
    const tags = (p.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    const btns = [];
    if (p.repo) btns.push(`<a class="btn btn-outline" href="${escapeAttr(p.repo)}" target="_blank" rel="noopener">GitHub</a>`);
    if (p.demo) btns.push(`<a class="btn btn-outline" href="${escapeAttr(p.demo)}" target="_blank" rel="noopener">Live Demo</a>`);
    if (p.details) btns.push(`<a class="btn btn-outline" href="${escapeAttr(p.details)}">Details</a>`);
    return `
    <article class="project-card reveal">
      <div class="project-top">
        <span class="project-cat">${escapeHtml(p.category || "Project")}</span>
        <span class="project-icon" aria-hidden="true">${escapeHtml(p.icon || "◍")}</span>
      </div>
      <h3>${escapeHtml(p.name)}</h3>
      <p class="desc">${escapeHtml(p.description)}</p>
      <div class="tag-row" aria-label="Technologies">${tags}</div>
      ${btns.length ? `<div class="project-actions">${btns.join("")}</div>`
        : `<p class="project-note mono">links on request — no public repo yet</p>`}
    </article>`;
  }).join("");

  /* ---- Skills ---- */
  const sg = $("#skillsGrid");
  sg.innerHTML = (cfg.skills || []).map((s) => `
    <div class="skill-card reveal">
      <h3>${escapeHtml(s.title)}</h3>
      <div class="tag-row">${(s.items || []).map((i) => `<span class="tag">${escapeHtml(i)}</span>`).join("")}</div>
    </div>`).join("");

  /* ---- Interactive contact cards (values from config) ---- */
  const c = cfg.contact || {};
  const discordName = (c.discord || "lalit572").trim();
  const emailAddr = (c.email || "tekkenlalit143@gmail.com").trim();

  const discordCard = $("#discordCard"), emailCard = $("#emailCard");
  const discordToggle = $("#discordToggle"), emailToggle = $("#emailToggle");
  const discordDetail = $("#discordDetail"), emailDetail = $("#emailDetail");
  const discordValue = $("#discordValue"), emailValue = $("#emailValue");
  const discordCopy = $("#discordCopy"), emailCopy = $("#emailCopy");
  const discordMsg = $("#discordMsg"), emailMsg = $("#emailMsg");
  const emailOpen = $("#emailOpen");

  if (discordValue) discordValue.textContent = discordName;
  if (emailValue) emailValue.textContent = emailAddr;
  if (discordCopy) discordCopy.setAttribute("aria-label", "Copy Discord username " + discordName);
  if (emailCopy) emailCopy.setAttribute("aria-label", "Copy email address " + emailAddr);
  if (emailOpen) emailOpen.setAttribute("href", "mailto:" + emailAddr);

  function setOpen(card, toggle, detail, open) {
    if (!card || !toggle || !detail) return;
    card.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", (toggle === discordToggle ? "Discord, " : "Email, ") + (open ? "collapse" : "expand"));
    if (open) { detail.hidden = false; }
    else { detail.hidden = true; }
  }
  if (discordToggle) discordToggle.addEventListener("click", () => {
    const open = discordToggle.getAttribute("aria-expanded") !== "true";
    setOpen(discordCard, discordToggle, discordDetail, open);
    hideMsg(discordMsg);
  });
  if (emailToggle) emailToggle.addEventListener("click", () => {
    const open = emailToggle.getAttribute("aria-expanded") !== "true";
    setOpen(emailCard, emailToggle, emailDetail, open);
    hideMsg(emailMsg);
  });

  // Extra optional links (GitHub etc.) — only rendered when configured, never faked.
  const extra = $("#contactExtra");
  const extraLinks = [];
  if (c.github) extraLinks.push(`<a class="contact-btn" href="${escapeAttr(c.github)}" target="_blank" rel="noopener">GitHub ↗</a>`);
  if (c.discordUrl) extraLinks.push(`<a class="contact-btn" href="${escapeAttr(c.discordUrl)}" target="_blank" rel="noopener">Discord Server 💬</a>`);
  if (c.youtube) extraLinks.push(`<a class="contact-btn" href="${escapeAttr(c.youtube)}" target="_blank" rel="noopener">YouTube ▶</a>`);
  if (c.linkedin) extraLinks.push(`<a class="contact-btn" href="${escapeAttr(c.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>`);
  if (extra && extraLinks.length) { extra.innerHTML = extraLinks.join(""); extra.hidden = false; }

  $("#footerSocial").innerHTML = [
    c.github ? `<a href="${escapeAttr(c.github)}" target="_blank" rel="noopener">GitHub</a>` : "",
    emailAddr ? `<a href="mailto:${escapeAttr(emailAddr)}">Email</a>` : "",
    c.discordUrl ? `<a href="${escapeAttr(c.discordUrl)}" target="_blank" rel="noopener">Discord</a>` : ""
  ].join("");

  /* ---- Copy to clipboard (cards) ---- */
  const toast = $("#toast");
  let toastTimer, msgTimer;
  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try { await navigator.clipboard.writeText(text); return true; }
      catch { /* fall through to legacy */ }
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch { return false; }
  }
  function flashMsg(el, text, isError) {
    if (!el) return;
    el.textContent = text;
    el.classList.toggle("error", !!isError);
    el.hidden = false;
    clearTimeout(msgTimer);
    msgTimer = setTimeout(() => { el.hidden = true; }, 2600);
  }
  function hideMsg(el) { if (el) el.hidden = true; }
  function showToast(msg) {
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2200);
  }
  if (discordCopy) discordCopy.addEventListener("click", async (e) => {
    e.stopPropagation();
    const ok = await copyText(discordName);
    if (ok) { flashMsg(discordMsg, "✓ Discord ID copied!", false); showToast("Discord ID copied!"); }
    else { flashMsg(discordMsg, "Copy failed — long-press to copy: " + discordName, true); }
  });
  if (emailCopy) emailCopy.addEventListener("click", async (e) => {
    e.stopPropagation();
    const ok = await copyText(emailAddr);
    if (ok) { flashMsg(emailMsg, "✓ Email copied!", false); showToast("Email copied!"); }
    else { flashMsg(emailMsg, "Copy failed — long-press to copy manually.", true); }
  });
  // Legacy generic [data-copy] support (kept for any extra buttons)
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const text = btn.getAttribute("data-copy");
    const ok = await copyText(text);
    if (ok) showToast("Copied: " + text);
  });

  /* ---- Mobile nav ---- */
  const toggle = $("#navToggle"), menu = $("#navMenu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });

  /* ---- Scrollspy ---- */
  const navLinks = [...document.querySelectorAll(".nav-link[data-nav]")];
  const sections = navLinks.map((a) => document.getElementById(a.dataset.nav)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navLinks.forEach((a) => a.classList.toggle("active", a.dataset.nav === en.target.id));
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---- Reveal on scroll (respects reduced motion via CSS) ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---- Helpers ---- */
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])); }
  function escapeAttr(s) { return escapeHtml(s).replace(/`/g, "&#96;"); }
})();
