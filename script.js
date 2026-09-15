// Scroll reveal animation
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, i * 120);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));

  // Nav background on scroll
  const nav = document.getElementById('nav');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          nav.style.background = 'rgba(10, 10, 15, 0.95)';
          nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
        } else {
          nav.style.background = 'rgba(10, 10, 15, 0.8)';
          nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
