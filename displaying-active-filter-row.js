  // Active filters row - hiding/showing
  // When using Finsweet filter, hide the whole row if no filters are active
  const filtersRow = document.querySelector('.filters-row');
  const observer = new MutationObserver((mutations) => {
    const nrOfActives = filtersRow.querySelectorAll('.filter-class').length;
    if (nrOfActives > 0) filtersRow.classList.remove('inactive');
    else filtersRow.classList.add('inactive');
  });
  observer.observe(filtersRow, { childList: true, subtree: true });
