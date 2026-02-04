/**
 * Going for Home - Main JavaScript
 * Production-ready with Firebase Analytics integration
 */

// Analytics event logging helper
function logAnalyticsEvent(eventName, params = {}) {
  if (window.firebaseAnalytics) {
    const { analytics, logEvent } = window.firebaseAnalytics;
    logEvent(analytics, eventName, params);
  }
}

// Trailer play functionality
function playTrailer() {
  const heroMedia = document.getElementById('heroMedia');
  const heroVideo = document.getElementById('heroVideo');
  
  if (!heroMedia.classList.contains('playing')) {
    heroMedia.classList.add('playing');
    // Update iframe src to autoplay
    heroVideo.src = 'https://player.vimeo.com/video/1101026967?h=8b4859ef3f&title=0&byline=0&portrait=0&autoplay=1';
    
    // Log trailer play event
    logAnalyticsEvent('video_start', {
      video_title: 'Going for Home Trailer',
      video_provider: 'vimeo'
    });
  }
}

// Page navigation
function showPage(pageId) {
  document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Show/hide scroll indicator based on page
  const heroScroll = document.querySelector('.hero-scroll');
  if (heroScroll) {
    heroScroll.style.display = pageId === 'about' ? '' : 'none';
  }
  
  // Reset trailer when leaving about page
  if (pageId !== 'about') {
    const heroMedia = document.getElementById('heroMedia');
    const heroVideo = document.getElementById('heroVideo');
    if (heroMedia && heroMedia.classList.contains('playing')) {
      heroMedia.classList.remove('playing');
      heroVideo.src = 'https://player.vimeo.com/video/1101026967?h=8b4859ef3f&title=0&byline=0&portrait=0&autoplay=0';
    }
  }
  
  // Log navigation event
  logAnalyticsEvent('page_view', {
    page_title: pageId,
    page_location: window.location.href
  });
  
  setTimeout(() => observeElements(), 100);
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}

// Scroll-triggered reveal animations
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

// Parallax effect
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  const parallaxBg = document.getElementById('parallaxBg');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Hero background parallax
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
    }
    
    // Parallax section
    if (parallaxBg) {
      const section = parallaxBg.closest('.parallax-section');
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const relativeScroll = scrollY - sectionTop + window.innerHeight;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        parallaxBg.style.transform = `translateY(${relativeScroll * 0.2}px)`;
      }
    }
  }, { passive: true });
}

// Contact form submission
async function handleContactSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('.contact-submit');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg = document.getElementById('formError');
  const introText = document.querySelector('.contact-intro');

  // Check honeypot field (spam protection)
  const honeypot = form.querySelector('input[name="website"]');
  if (honeypot && honeypot.value) {
    // Bot detected, silently fail
    if (introText) introText.style.display = 'none';
    form.style.display = 'none';
    successMsg.style.display = 'block';
    return;
  }

  // Get form data
  const name = form.querySelector('#contactName').value.trim();
  const email = form.querySelector('#contactEmail').value.trim();
  const inquiryType = form.querySelector('#inquiryType').value;
  const message = form.querySelector('#contactMessage').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    return;
  }

  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  successMsg.style.display = 'none';
  errorMsg.style.display = 'none';

  try {
    // Submit to Firestore
    if (window.firebaseFirestore) {
      const { db, collection, addDoc, serverTimestamp } = window.firebaseFirestore;
      await addDoc(collection(db, 'contact_submissions'), {
        name,
        email,
        inquiryType,
        message,
        createdAt: serverTimestamp(),
        read: false
      });
    }

    // Log analytics event
    logAnalyticsEvent('contact_form_submit', {
      inquiry_type: inquiryType
    });

    // Show success - hide form and intro, show success message
    if (introText) introText.style.display = 'none';
    form.style.display = 'none';
    successMsg.style.display = 'block';

  } catch (error) {
    console.error('Error submitting contact form:', error);
    errorMsg.style.display = 'block';
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Set up nav link click handlers
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => { 
      e.preventDefault(); 
      showPage(link.dataset.page); 
    });
  });
  
  // Nav scroll effect and hide scroll indicator
  const heroScroll = document.querySelector('.hero-scroll');

  // Remove animation after it completes so we can control opacity via JS
  if (heroScroll) {
    heroScroll.addEventListener('animationend', () => {
      heroScroll.style.animation = 'none';
      heroScroll.style.opacity = '1';
    });
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.getElementById('nav').classList.toggle('scrolled', scrollY > 50);

    // Hide scroll indicator after scrolling down
    if (heroScroll) {
      const shouldHide = scrollY > 100;
      heroScroll.style.opacity = shouldHide ? '0' : '1';
      heroScroll.style.pointerEvents = shouldHide ? 'none' : 'auto';
    }
  });
  
  // Initialize animations and parallax
  observeElements();
  initParallax();

  // Set up contact form handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Log initial page view
  logAnalyticsEvent('page_view', {
    page_title: 'about',
    page_location: window.location.href
  });
});
