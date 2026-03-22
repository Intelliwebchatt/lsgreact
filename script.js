const progress = document.getElementById('progress');
const toTop = document.getElementById('toTop');
const reveals = document.querySelectorAll('.reveal');
const qualifierForm = document.getElementById('qualifierForm');
const qualifierResult = document.getElementById('qualifierResult');
const applicationShell = document.getElementById('applicationShell');
const q1Answer = document.getElementById('q1Answer');
const q2Answer = document.getElementById('q2Answer');
const q3Answer = document.getElementById('q3Answer');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progress) progress.style.width = ratio + '%';
  if (toTop) toTop.classList.toggle('show', scrollTop > 520);
}

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

reveals.forEach((item) => {
  if (!item.classList.contains('visible')) observer.observe(item);
});

if (qualifierForm) {
  qualifierForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(qualifierForm);
    const q1 = data.get('q1');
    const q2 = data.get('q2');
    const q3 = data.get('q3');

    if (!q1 || !q2 || !q3) {
      qualifierResult.textContent = 'Answer all 3 questions to continue.';
      return;
    }

    q1Answer.value = q1;
    q2Answer.value = q2;
    q3Answer.value = q3;

    const yesCount = [q1, q2, q3].filter((value) => value === 'Yes').length;
    if (yesCount === 3) {
      qualifierResult.textContent = 'Strong fit indicators. Continue with the application below.';
    } else if (yesCount === 2) {
      qualifierResult.textContent = 'Possible fit. Continue with the application below.';
    } else {
      qualifierResult.textContent = 'You can still apply, but the role is built mainly for experienced closers.';
    }

    applicationShell.classList.remove('hidden');
    setTimeout(() => {
      applicationShell.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  });
}
