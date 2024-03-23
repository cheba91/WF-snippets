  /*

    Add data-name to each dropdown item and tab item text

  */
  window.addEventListener('load', () => {
    //----------------------------------------------
    const dropdownItemSelector = '.dropdown__item';
    const tabLinkSelector = '.tab__menu__link';
    const tabLinkTextSelector = '.tab__menu__link__text';

    const dropdownItems = document.querySelectorAll(dropdownItemSelector);
    const tabItems = document.querySelectorAll(tabLinkSelector);

    //Initial dropdown
    const initalTab = document.querySelector(`${tabLinkSelector}.w--current ${tabLinkTextSelector}`).getAttribute('data-name');
    document.querySelector(`${dropdownItemSelector}[data-name="${initalTab}"]`).classList.add('is--active');

    // Dropdown items
    dropdownItems.forEach((item) => {
      item.addEventListener('click', () => {
        dropdownItems.forEach((el) => el.classList.remove('is--active'));
        item.classList.add('is--active');
        const selectedItem = item.getAttribute('data-name');
        // Select the tab
        document.querySelector(`${tabLinkSelector} ${tabLinkTextSelector}[data-name="${selectedItem}"]`).click();
        // Close dropdown
        $('.dropdown-toggle').trigger('w-close');
      });
    });

    // Tabs
    tabItems.forEach((item) => {
      item.addEventListener('click', () => {
        document.querySelector(`${dropdownItemSelector}.is--active`).classList.remove('is--active');
        const selectedItem = item.querySelector(`${tabLinkTextSelector}`).getAttribute('data-name');
        document.querySelector(`${dropdownItemSelector}[data-name="${selectedItem}"]`).classList.add('is--active');
      });
    });
    //----------------------------------------------
  });

 /*

    Add on all pages, eg. footer
    Used to scroll to tabs on page with tabs or save tab id to local storage

  */
  document.addEventListener('DOMContentLoaded', () => {
    //----------------------------------------------
    const pathname = window.location.pathname;
    document.querySelectorAll('.footer-link.is--tab').forEach((el) => {
      el.addEventListener('click', (e) => {
        const tabId = el.getAttribute('tab-id');
        if (pathname === '/') {
          // If it's page with tabs
          e.preventDefault();
          e.stopPropagation();
          document.querySelector(`.tab__menu__link__text[data-name="${tabId}"]`)?.click();
          setTimeout(() => document.querySelector('#tabs-anchor')?.scrollIntoView({ behavior: 'smooth' }), 10);
        } else {
          // Save to local storage
          localStorage.setItem('tab-id', tab - id);
        }
      });
    });
    //----------------------------------------------
  });

  /*

    Add on tabs page
    Interval is used because of Finsweet tabs and need to wait for them to populate

  */
  document.addEventListener('DOMContentLoaded', () => {
    //----------------------------------------------
    const tabId = localStorage.getItem('tab-id');
    if (tabId) {
      const tabInterval = setInterval(() => {
        const isTabsPopulated = document.querySelectorAll('.tab__menu__link')?.length;
        if (isTabsPopulated) {
          document.querySelector(`.tab__menu__link__text[data-name="${tabId}"]`)?.click();
          clearInterval(tabInterval);
          localStorage.removeItem('tab-id');
        }
      }, 100);
    }
    //----------------------------------------------
  });
