const header = document.getElementById('header');
const texts = document.querySelectorAll('.fade-text');
const buttons = document.querySelector('.buttons');
const path = document.querySelector('#line path');

const pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength;
path.style.strokeDashoffset = pathLength;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Move header to top and toggle body background color
  if (scrollY > 50) {
    header.classList.add('moved');
    document.body.classList.add('scrolled-bg');  // Add background class
  } else {
    header.classList.remove('moved');
    document.body.classList.remove('scrolled-bg'); // Remove background class
  }

  // Animate line
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const drawLength = pathLength * (scrollY / maxScroll);
  path.style.strokeDashoffset = pathLength - drawLength;

  // Fade in/out text
  texts.forEach((el) => {
    const revealPoint = window.innerHeight * 0.7;
    const elTop = el.getBoundingClientRect().top;

    if (elTop < revealPoint) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });

  // Show buttons
  const lastText = texts[texts.length - 1];
  if (lastText.getBoundingClientRect().bottom < window.innerHeight * 0.8) {
    buttons.classList.add('show');
  }
});
