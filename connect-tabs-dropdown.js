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
