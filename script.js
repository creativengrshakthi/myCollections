const header = document.getElementById('header');
const texts = document.querySelectorAll('.fade-text');
const buttons = document.querySelector('.buttons');
const path = document.querySelector('#line path');

const pathLength = path.getTotalLength();

// === Snake configuration ===
const visibleSegment = 300; // Length of the "snake" that's visible
path.style.strokeDasharray = `${visibleSegment} ${pathLength}`;

// Initial offset: start fully hidden above screen
path.style.strokeDashoffset = pathLength;

// Scroll listener
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Move header
  header.classList.toggle('moved', scrollY > 50);

  // Snake slithering line
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollProgress = scrollY / maxScroll;
  const offset = pathLength * (1 - scrollProgress); // snake moves down
  path.style.strokeDashoffset = offset;

  // Fade-in text
  texts.forEach((el) => {
    const revealPoint = window.innerHeight * 0.7;
    const elTop = el.getBoundingClientRect().top;
    if (elTop < revealPoint) el.classList.add('visible');
  });

  // Show buttons
  const lastText = texts[texts.length - 1];
  if (lastText.getBoundingClientRect().bottom < window.innerHeight * 0.8) {
    buttons.classList.add('show');
  } else {
    buttons.classList.remove('show');
  }
});
