// ── GSAP Fallback ──
setTimeout(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    document.querySelectorAll('.reveal, .service-card, .gallery-item, .testimonial-card').forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
}, 3000);

// ── Wait for libraries to load ──
document.addEventListener('DOMContentLoaded', function() {
  // Init Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ── Navbar scroll behavior ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ── Mobile menu toggle ──
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── GSAP Animations ──
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Init Lenis smooth scrolling
    if (typeof Lenis !== 'undefined') {
      var lenis = new Lenis({
        duration: 1.2,
        easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      lenis.on('scroll', ScrollTrigger.update);
    }

    // ── Hero text reveal ──
    gsap.fromTo('.hero-title span',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power4.out', delay: 0.3 }
    );

    gsap.fromTo('.hero-subtitle',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
    );

    gsap.fromTo('.hero-cta',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.0 }
    );

    gsap.fromTo('.hero-badges',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
    );

    // ── Parallax background ──
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': function() {
        gsap.to('.parallax-bg', {
          yPercent: -20,
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

    // ── Generic scroll reveals ──
    gsap.utils.toArray('.reveal').forEach(function(el) {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    });

    // ── Service/program card stagger ──
    gsap.fromTo('.service-card',
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.programs', start: 'top 80%' }
      }
    );

    // ── Gallery items stagger ──
    gsap.fromTo('.gallery-item',
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.gallery', start: 'top 80%' }
      }
    );
  }
});
