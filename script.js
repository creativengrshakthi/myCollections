const header = document.getElementById('header');
const texts = document.querySelectorAll('.fade-text');
const buttons = document.querySelector('.buttons');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    header.classList.add('moved');
    document.body.classList.add('scrolled-bg');
  } else {
    header.classList.remove('moved');
    document.body.classList.remove('scrolled-bg');
  }

  texts.forEach((el) => {
    const revealPoint = window.innerHeight * 0.7;
    const elTop = el.getBoundingClientRect().top;

    if (elTop < revealPoint) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });

  const lastText = texts[texts.length - 1];
  if (lastText.getBoundingClientRect().bottom < window.innerHeight * 0.8) {
    buttons.classList.add('show');
  }
});
