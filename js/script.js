// ========== HEADER SCROLL EFFECT ==========
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========== MOBILE MENU TOGGLE ==========
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');
menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ========== SCROLL SUAVE ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========== SLIDER (ANTES Y DESPUÉS) con AUTOPLAY ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let autoplayInterval;

function updateSlider() {
  if (!slider) return;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
  if (currentSlide < slides.length - 1) currentSlide++;
  else currentSlide = 0;
  updateSlider();
  resetAutoplay();
}

function prevSlide() {
  if (currentSlide > 0) currentSlide--;
  else currentSlide = slides.length - 1;
  updateSlider();
  resetAutoplay();
}

function startAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval);
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 4000); // Cambia cada 3 segundos (ajústalo a 4000 si prefieres 4 seg)
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

// Iniciar autoplay si hay al menos una slide
if (slides.length > 0 && prevBtn && nextBtn) {
  startAutoplay();
  nextBtn.addEventListener('click', () => {
    nextSlide();
  });
  prevBtn.addEventListener('click', () => {
    prevSlide();
  });
  
  // Opcional: pausar autoplay cuando el mouse esté sobre el slider
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });
    sliderContainer.addEventListener('mouseleave', () => {
      startAutoplay();
    });
  }
}

// ========== FORMULARIO CON ENVÍO A WHATSAPP + GA ==========
const form = document.getElementById('leadForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.querySelector('#leadForm textarea').value.trim();
    if (!name || !phone) {
      alert('Por favor ingresa tu nombre y teléfono.');
      return;
    }
    const textMsg = `Hola, soy ${name}. Mi teléfono es ${phone}. Correo: ${email || 'no indicado'}. Mensaje: ${message || 'Deseo agendar una cita'}`;
    const waLink = `https://wa.me/573152012449?text=${encodeURIComponent(textMsg)}`;
    window.open(waLink, '_blank');
    // Google Analytics Event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submission', { event_category: 'lead', event_label: 'Formulario contacto' });
    }
    form.reset();
    alert('¡Gracias! Serás redirigido a WhatsApp para agendar tu cita.');
  });
}

// ========== TRACKING DE CLICS EN WHATSAPP ==========
const whatsappBtns = document.querySelectorAll('#heroWhatsAppBtn, #offerWhatsAppBtn, #floatingWhatsApp, #finalWhatsAppBtn, .btn-cta-nav');
whatsappBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_click', { event_category: 'conversion', event_label: 'CTA WhatsApp' });
    }
  });
});

// ========== LAZY LOADING + ANIMACIONES AL SCROLL (simple) ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.service-card, .review-card, .features-grid > div, .doctor-grid, .offer-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});