const header = document.getElementById('header');
const texts = document.querySelectorAll('.fade-text');
const buttons = document.querySelector('.buttons');
const path = document.querySelector('#line path');

const pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength;
path.style.strokeDashoffset = pathLength;

// Scroll thresholds
const drawEnd = 600;   // Line fully drawn by this scroll position
const wipeEnd = 1200;  // Line fully wiped by this scroll position

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // === Header movement ===
  if (scrollY > 50) {
    header.classList.add('moved');
  } else {
    header.classList.remove('moved');
  }

  // === Line animation: draw → wipe ===
  if (scrollY <= drawEnd) {
    // Drawing phase: from top to bottom
    const drawProgress = scrollY / drawEnd;
    path.style.strokeDashoffset = pathLength * (1 - drawProgress);
    path.style.opacity = 1;
  } else if (scrollY > drawEnd && scrollY <= wipeEnd) {
    // Wiping phase: erasing from top to bottom
    const wipeProgress = (scrollY - drawEnd) / (wipeEnd - drawEnd);
    path.style.strokeDashoffset = pathLength * wipeProgress;
    path.style.opacity = 1;
  } else {
    // Line fully wiped
    path.style.strokeDashoffset = pathLength;
    path.style.opacity = 0;
  }

  // === Fade-in text ===
  texts.forEach((el) => {
    const revealPoint = window.innerHeight * 0.7;
    const elTop = el.getBoundingClientRect().top;

    if (elTop < revealPoint) {
      el.classList.add('visible');
    }
  });

  // === Show buttons when text has scrolled into view ===
  const lastText = texts[texts.length - 1];
  if (lastText.getBoundingClientRect().bottom < window.innerHeight * 0.8) {
    buttons.classList.add('show');
  } else {
    buttons.classList.remove('show');
  }
});
