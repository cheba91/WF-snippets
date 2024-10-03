  // Global. Reuse for dynamic content
  // Set [external-resource="link"] as sibling to [external-resource="wrap"]
  // Set [external-resource="link"] with link, and text to "Link"
  const updateResourceLinks = () => {
    document.querySelectorAll('[external-resource="link"]').forEach((link) => {
      const resourcewrap = link.parentElement?.querySelector('[external-resource="wrap"]');

      if (resourcewrap && link.innerText === 'Link' && link.href !== '') {
        resourcewrap.href = link.href;
        resourcewrap.target = '_blank';
        resourcewrap.rel = 'noopener noreferrer';
        link.remove();
      }
    });
  };
