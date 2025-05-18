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
  const drawLength = pathLength * (scrollY / document.body.scrollHeight);
  path.style.strokeDashoffset = pathLength - drawLength;

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

  if (drawLength >= pathLength) {
  document.body.style.overflow = 'hidden';
  window.scrollTo(0, window.scrollY); // Freeze the page
}

});
