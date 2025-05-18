const header = document.getElementById('header');
const texts = document.querySelectorAll('.fade-text');
const buttons = document.querySelector('.buttons');
const path = document.querySelector('#line path');

const pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength;
path.style.strokeDashoffset = pathLength;

// Scroll thresholds
const drawEnd = 600;   // Fully drawn at this scroll position
const wipeEnd = 1200;  // Fully wiped at this scroll position

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // === Header movement ===
  if (scrollY > 50) {
    header.classList.add('moved');
  } else {
    header.classList.remove('moved');
  }

  // === Line stroke animation (draw → wipe, same direction) ===
  let offset;

  if (scrollY <= drawEnd) {
    // Drawing phase: from pathLength → 0
    const progress = scrollY / drawEnd;
    offset = pathLength * (1 - progress);
  } else if (scrollY <= wipeEnd) {
    // Wiping phase: from 0 → pathLength
    const progress = (scrollY - drawEnd) / (wipeEnd - drawEnd);
    offset = pathLength * progress;
  } else {
    // Beyond wipe end: fully hidden
    offset = pathLength;
  }

  path.style.strokeDashoffset = offset;
  path.style.opacity = offset >= pathLength ? 0 : 1;

  // === Fade-in text ===
  texts.forEach((el) => {
    const revealPoint = window.innerHeight * 0.7;
    const elTop = el.getBoundingClientRect().top;

    if (elTop < revealPoint) {
      el.classList.add('visible');
    }
  });

  // === Show buttons ===
  const lastText = texts[texts.length - 1];
  if (lastText.getBoundingClientRect().bottom < window.innerHeight * 0.8) {
    buttons.classList.add('show');
  } else {
    buttons.classList.remove('show');
  }
});
