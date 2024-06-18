window.addEventListener('load', () => {
  const activeUnderlineSelector = '.tabs__line';
  const allLinksSelector = '.tabs__link';

  const activeUnderlineEl = document.querySelector(activeUnderlineSelector);
  const currentLink = document.querySelector(`${allLinksSelector}.w--current`);
  const allLinks = document.querySelectorAll(allLinksSelector);
  let activeLineLeft = 0;
  let currentLinkCenter = false;

  if (activeUnderlineEl && allLinks.length) {
    if (currentLink) {
      const currentElementWidth = currentLink.offsetWidth;
      const currentElementLeftOffset = currentLink.offsetLeft;
      const currentElementCenter = currentElementLeftOffset + currentElementWidth / 2;
      activeLineLeft = currentElementCenter - activeUnderlineEl.offsetWidth / 2;
      activeUnderlineEl.style.left = currentLinkCenter = `${activeLineLeft}px`;
      setTimeout(() => activeUnderlineEl.classList.add('is--active'), 200);
    }

    allLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const linkWidth = link.offsetWidth;
        const linkLeftOffset = link.offsetLeft;
        const linkCenter = linkLeftOffset + linkWidth / 2;
        activeLineLeft = linkCenter - activeUnderlineEl.offsetWidth / 2;
        activeUnderlineEl.style.left = `${activeLineLeft}px`;
        setTimeout(() => activeUnderlineEl.classList.add('is--active'), 200);
      });
    });
  }
});
