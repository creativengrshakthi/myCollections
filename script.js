const header = document.getElementById('header');
const texts = document.querySelectorAll('.fade-text');
const buttons = document.querySelector('.buttons');
const path = document.querySelector('#line path');

const pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength;
path.style.strokeDashoffset = pathLength;

// Scroll thresholds
const drawEnd = 600;   // Fully drawn by 600px
const wipeEnd = 1200;  // Fully wiped by 1200px

window\.addEventListener('scroll', () => {
const scrollY = window\.scrollY;

// === Header animation ===
if (scrollY > 50) {
header.classList.add('moved');
} else {
header.classList.remove('moved');
}

// === Line draw & wipe (top to bottom for both) ===
if (scrollY <= drawEnd) {
// Draw line: offset goes from full length → 0, dasharray fixed
const progress = scrollY / drawEnd;
path.style.strokeDashoffset = pathLength \* (1 - progress);
path.style.strokeDasharray = pathLength;
path.style.opacity = 1;
} else if (scrollY > drawEnd && scrollY <= wipeEnd) {
// Wipe line: offset fixed at 0, dasharray shrinks top to bottom
const wipeProgress = (scrollY - drawEnd) / (wipeEnd - drawEnd);
path.style.strokeDashoffset = 0;
path.style.strokeDasharray = (pathLength \* (1 - wipeProgress)) + ' ' + pathLength;
path.style.opacity = 1;
} else {
// Fully wiped out: no visible dash
path.style.strokeDashoffset = 0;
path.style.strokeDasharray = '0 ' + pathLength;
path.style.opacity = 0;
}

// === Fade in text ===
texts.forEach((el) => {
const revealPoint = window\.innerHeight \* 0.7;
const elTop = el.getBoundingClientRect().top;

if (elTop < revealPoint) {
  el.classList.add('visible');
}


});

// === Show buttons ===
const lastText = texts\[texts.length - 1];
if (lastText.getBoundingClientRect().bottom < window\.innerHeight \* 0.8) {
buttons.classList.add('show');
} else {
buttons.classList.remove('show');
}
});
