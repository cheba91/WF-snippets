
  document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu height. Offsets mobile URL bar
    const nav = document.querySelector('.navigation');
    const navMenu = document.querySelector('.navigation .navigation__menu');

    const updateMaxHeight = () => {
      if (!nav || !navMenu) return;
      if (window.innerWidth < 992) {
        navMenu.style.maxHeight = `${window.innerHeight - nav.offsetHeight}px`;
      } else {
        navMenu.style.maxHeight = '';
      }
    };

    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);

    // Scrolled state
    const navigation = document.querySelector('.navigation');
    if (navigation) {
      window.addEventListener(
        'scroll',
        () => {
          navigation.classList.toggle('is--scrolled', window.scrollY >= 30);
        },
        { passive: true },
      );
    }
  });
