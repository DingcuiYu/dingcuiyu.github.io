(function () {
  const container = document.getElementById("publication-list");
  if (!container) return;

  const publications = Array.isArray(window.PUBLICATIONS) ? window.PUBLICATIONS : [];
  const limit = Number(container.dataset.limit || publications.length);
  const visiblePublications = publications.slice(0, limit);

  if (visiblePublications.length === 0) {
    container.innerHTML = "<p>No publications listed yet.</p>";
    return;
  }

  const escapeHtml = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  const renderAuthors = (authors) => authors
    .map((author) => {
      const escaped = escapeHtml(author);
      return escaped.replace("Dingcui Yu", "<strong>Dingcui Yu</strong>");
    })
    .join(", ");

  container.innerHTML = visiblePublications.map((publication) => {
    const links = (publication.links || [])
      .map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener">${escapeHtml(link.label)}</a>`)
      .join(" ");
    const awards = (publication.awards || [])
      .map((award) => `<span class="publication-award">${escapeHtml(award)}</span>`)
      .join(" ");

    return `
      <article class="publication-item">
        <h3>${escapeHtml(publication.title)}${awards ? ` <span class="publication-awards">${awards}</span>` : ""}</h3>
        <p class="publication-authors">${renderAuthors(publication.authors || [])}</p>
        <p class="publication-meta">${escapeHtml(publication.venue)}${publication.venue && publication.year ? ", " : ""}${escapeHtml(publication.year)}</p>
        ${links ? `<p class="publication-links">${links}</p>` : ""}
      </article>
    `;
  }).join("");
}());
