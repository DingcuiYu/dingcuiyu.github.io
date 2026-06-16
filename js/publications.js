(function () {
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

  const renderPublication = (publication) => {
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
        <p class="publication-meta">${escapeHtml(publication.venue)}${publication.venue && publication.year ? ", " : ""}${escapeHtml(publication.year || "")}</p>
        ${links ? `<p class="publication-links">${links}</p>` : ""}
      </article>
    `;
  };

  const renderList = (container, publications, emptyMessage) => {
    const limit = Number(container.dataset.limit || publications.length);
    const visiblePublications = publications.slice(0, limit);

    if (visiblePublications.length === 0) {
      container.innerHTML = `<p>${escapeHtml(emptyMessage)}</p>`;
      return;
    }

    container.innerHTML = visiblePublications.map(renderPublication).join("");
  };

  const justAcceptedContainer = document.getElementById("just-accepted-list");
  if (justAcceptedContainer) {
    const justAccepted = Array.isArray(window.JUST_ACCEPTED) ? window.JUST_ACCEPTED : [];
    renderList(justAcceptedContainer, justAccepted, "No accepted papers listed yet.");
  }

  const publicationContainer = document.getElementById("publication-list");
  if (publicationContainer) {
    const publications = Array.isArray(window.PUBLICATIONS) ? window.PUBLICATIONS : [];
    renderList(publicationContainer, publications, "No publications listed yet.");
  }
}());
