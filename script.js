document.addEventListener('DOMContentLoaded', () => {
  const noBtn = document.getElementById('noBtn');
  const actions = document.querySelector('.actions');
  if (!noBtn || !actions) return;

  // Ensure the container can host absolute positioned child safely
  const ensureMinSpace = () => {
    const btnRect = noBtn.getBoundingClientRect();
    const minH = Math.max(64, Math.ceil(btnRect.height) + 16);
    if (actions.style.minHeight !== `${minH}px`) {
      actions.style.minHeight = `${minH}px`;
    }
  };

  const moveButton = () => {
    const rect = actions.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Compute bounds within the container
    const maxX = Math.max(0, rect.width - btnRect.width);
    const maxY = Math.max(0, rect.height - btnRect.height);

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  };

  // Interactions that should make the button run away
  ['mouseenter', 'mouseover', 'mousemove', 'touchstart', 'touchmove'].forEach((evt) => {
    noBtn.addEventListener(evt, moveButton, { passive: true });
  });

  // Prevent navigation and keep running
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
  });

  // Initial layout adjustments and placement
  requestAnimationFrame(() => {
    ensureMinSpace();
    moveButton();
  });

  // Recompute on resize/orientation change
  window.addEventListener('resize', () => {
    ensureMinSpace();
    moveButton();
  }, { passive: true });
});
