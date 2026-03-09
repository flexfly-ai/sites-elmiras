// GSAP fallback — if libraries fail to load, show all content
setTimeout(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP libraries failed to load, showing fallback content');
    document.querySelectorAll('.reveal, .program-card, .gallery-item').forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Initialize Lenis smooth scrolling
  const lenis = new Lenis({ 
    duration: 1.2, 
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
  });

  function raf(time) { 
    lenis.raf(time); 
    requestAnimationFrame(raf); 
  }
  requestAnimationFrame(raf);

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  
  // Update ScrollTrigger on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update);

  // Hero text reveal animation
  gsap.fromTo('.hero-title span', 
    { y: 100, opacity: 0 }, 
    { 
      y: 0, 
      opacity: 1, 
      duration: 1.2, 
      stagger: 0.08, 
      ease: 'power4.out', 
      delay: 0.3 
    }
  );

  gsap.fromTo('.hero-subtitle', 
    { y: 60, opacity: 0 }, 
    { 
      y: 0, 
      opacity: 1, 
      duration: 1, 
      ease: 'power3.out', 
      delay: 1 
    }
  );

  gsap.fromTo('.phone-cta', 
    { y: 40, opacity: 0 }, 
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: 'power2.out', 
      delay: 1.5 
    }
  );

  // Parallax background
  gsap.to('.parallax-bg', {
    yPercent: -20,
    scrollTrigger: { 
      trigger: '.hero', 
      start: 'top top', 
      end: 'bottom top', 
      scrub: true 
    }
  });

  // Phone CTA pulse animation
  gsap.to('.phone-cta', {
    scale: 1.05,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut'
  });

  // Generic reveal elements on scroll
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: { 
          trigger: el, 
          start: 'top 85%', 
          toggleActions: 'play none none none' 
        }
      }
    );
  });

  // Program cards staggered animation
  gsap.fromTo('.program-card',
    { y: 80, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      stagger: 0.2, 
      ease: 'power2.out',
      scrollTrigger: { 
        trigger: '.programs', 
        start: 'top 80%' 
      }
    }
  );

  // Gallery items hover and reveal
  gsap.fromTo('.gallery-item',
    { y: 100, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 1, 
      stagger: 0.15, 
      ease: 'power3.out',
      scrollTrigger: { 
        trigger: '.gallery', 
        start: 'top 75%' 
      }
    }
  );

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

}, 3000); // 3-second fallback timeout

// Initialize Lucide icons immediately if available
document.addEventListener('DOMContentLoaded', function() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});