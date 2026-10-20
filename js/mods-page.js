/* Minecraft Mods collection page — renders window.MODS with search. */
(function () {
  "use strict";
  const mods = Array.isArray(window.MODS) ? window.MODS : [];
  const grid = document.getElementById("modGrid");
  const search = document.getElementById("modSearch");
  const count = document.getElementById("modsCount");
  const empty = document.getElementById("noResults");
  if (!grid) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  function tagList(items, cls) {
    if (!items || !items.length) return "";
    return items.map(function (t) { return '<span class="tag ' + (cls || "") + '">' + esc(t) + "</span>"; }).join("");
  }

  function card(m) {
    const dl = m.file
      ? '<a class="btn btn-primary btn-sm mod-download" href="' + esc(m.file) + '" download="' +
        esc(m.fileForced || m.file.split("/").pop()) + '" aria-label="Download ' + esc(m.name) +
        ' version ' + esc(m.version) + ' as a JAR file">Download JAR</a>'
      : '<span class="project-note mono">download: TODO — file not added yet</span>';
    return (
      '<article class="mod-card">' +
        '<div class="mod-head">' +
          "<h2>" + esc(m.name) + "</h2>" +
          '<span class="mod-version mono">' + esc(m.version) + "</span>" +
        "</div>" +
        '<p class="mod-desc">' + esc(m.description) + "</p>" +
        '<dl class="mod-meta">' +
          "<div><dt>Minecraft</dt><dd>" + esc(m.mc || "TODO: confirm") + "</dd></div>" +
          "<div><dt>Loader</dt><dd>" + esc(m.loader || "TODO: confirm") + "</dd></div>" +
          (m.loaderMin ? "<div><dt>Loader min</dt><dd>" + esc(m.loaderMin) + "</dd></div>" : "") +
        "</dl>" +
        (m.deps && m.deps.length
          ? '<div class="mod-group"><span class="mod-label mono">Requires</span><div class="tag-row">' +
            tagList(m.deps) + "</div></div>"
          : "") +
        (m.recommends && m.recommends.length
          ? '<div class="mod-group"><span class="mod-label mono">Recommended</span><div class="tag-row">' +
            tagList(m.recommends) + "</div></div>"
          : "") +
        (m.features && m.features.length
          ? '<div class="mod-group"><span class="mod-label mono">Features</span><div class="tag-row">' +
            tagList(m.features) + "</div></div>"
          : "") +
        (m.notes ? '<p class="mod-notes">' + esc(m.notes) + "</p>" : "") +
        '<div class="mod-foot">' + dl +
          '<span class="mod-size mono" aria-label="File size">' + esc(m.size || "") + "</span>" +
        "</div>" +
      "</article>"
    );
  }

  function render(list) {
    grid.innerHTML = list.map(card).join("");
    if (count) count.textContent = list.length + (list.length === 1 ? " mod" : " mods");
    if (empty) empty.hidden = list.length !== 0;
  }

  render(mods);

  if (search) {
    search.addEventListener("input", function () {
      const q = search.value.trim().toLowerCase();
      if (!q) { render(mods); return; }
      const hits = mods.filter(function (m) {
        const hay = [m.name, m.description, m.loader, m.mc, (m.features || []).join(" ")]
          .join(" ").toLowerCase();
        return hay.indexOf(q) !== -1;
      });
      render(hits);
    });
  }
})();
