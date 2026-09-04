// ============================================================
// ALPHA ARCHITECTURE — script principal (vanilla JS, sans dépendance)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navigation mobile ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-primary');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Header : fond plein au scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-solid', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Apparition progressive au scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Formulaire de contact ----------
     Prêt à être relié gratuitement à Formspree (https://formspree.io) :
     remplacer l'attribut action="#" par action="https://formspree.io/f/VOTRE_ID"
     et method déjà en POST. Le script ci-dessous gère juste un état de
     confirmation local en attendant le branchement définitif. */
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const action = form.getAttribute('action') || '';
      if (!action || action === '#') {
        e.preventDefault();
        const note = form.querySelector('.form-note');
        if (note) {
          note.textContent = 'Formulaire non encore connecté — voir js/main.js et le README pour brancher Formspree.';
        }
      }
      // Si un vrai "action" Formspree est renseigné, l'envoi natif du
      // formulaire (POST) s'exécute normalement, sans JavaScript requis.
    });
  }

});
