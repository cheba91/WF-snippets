document.addEventListener('DOMContentLoaded', () => {
  function replaceP() {
    const richTextElements = document.querySelectorAll('.blog-rich-text');

    richTextElements.forEach((element) => {
      const paragraphs = element.getElementsByTagName('p');
      let isCollecting = false;
      let collectedContent = [];
      let startParagraph = null;

      // Convert HTMLCollection to Array for easier manipulation
      Array.from(paragraphs).forEach((p, index) => {
        if (p.textContent.includes('[dark-blue]')) {
          isCollecting = true;
          startParagraph = p;
          return;
        }

        if (p.textContent.includes('[/dark-blue]')) {
          isCollecting = false;
          // Create a new div with all collected content

          const newDiv = document.createElement('div');
          newDiv.className = 'dark-blue';

          const parser = new DOMParser();
          const doc = parser.parseFromString(collectedContent.map((para) => `<p>${para.innerHTML}</p>`).join(''), 'text/html');
          newDiv.innerHTML = doc.body.innerHTML;

          // Replace the range from start to end with the new div
          startParagraph.after(newDiv);

          // Remove all processed paragraphs
          collectedContent.forEach((para) => para.remove());
          startParagraph.remove(); // Remove [green] paragraph
          p.remove(); // Remove [/green] paragraph

          collectedContent = [];
          startParagraph = null;
          return;
        }

        if (isCollecting) {
          collectedContent.push(p);
        }
      });
    });
  }
  replaceP();
});
