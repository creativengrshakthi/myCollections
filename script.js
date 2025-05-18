const header = document.getElementById('header');
const texts = document.querySelectorAll('.fade-text');
const buttons = document.querySelector('.buttons');
const path = document.querySelector('#line path');

const pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength;
path.style.strokeDashoffset = pathLength;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Move header to top
  if (scrollY > 50) {
    header.classList.add('moved');
  } else {
    header.classList.remove('moved');
  }

  // Animate line
  const maxScrollForLine = 1000; // Adjust based on how long you want the line to show

if (scrollY < maxScrollForLine) {
  const drawLength = pathLength * (scrollY / maxScrollForLine);
  path.style.strokeDashoffset = pathLength - drawLength;
  path.style.opacity = 1;
} else {
  path.style.strokeDashoffset = 0;
  path.style.opacity = 0; // Hide line after it finishes
}

  // Fade in text
  texts.forEach((el, i) => {
    const revealPoint = window.innerHeight * 0.7;
    const elTop = el.getBoundingClientRect().top;

    if (elTop < revealPoint) {
      el.classList.add('visible');
    }
  });

  // Show buttons
  const lastText = texts[texts.length - 1];
  if (lastText.getBoundingClientRect().bottom < window.innerHeight * 0.8) {
    buttons.classList.add('show');
  }
});
