// Display as normal dropdown, but limit it's height to bottom of the screen. Offsets mobile URL bar
  document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 992) {
      const nav = document.querySelector('.nav');
      const navMenu = document.querySelector('.nav__menu');
      const setMaxHeight = () => nav && navMenu && (navMenu.style.maxHeight = `${window.innerHeight - nav.offsetHeight}px`);
      setMaxHeight();
      window.addEventListener('resize', setMaxHeight);
    }
  });
