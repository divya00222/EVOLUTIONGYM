/**
 * EVOLUTION GYM KATHMANDU - PURE JAVASCRIPT ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderScroll();
  initActiveNavLink();
  initScrollReveal();
  initProgramFilters();
  initTrainerFilters();
  initPricingToggle();
  initFaqAccordion();
  initGalleryLightbox();
  initModals();
  initContactForm();
  initFloatingWhatsApp();
  initWhatsAppButtons();
});

/* ==========================================================================
   1. NAVIGATION & HAMBURGER MENU
   ========================================================================== */
function initNavigation() {
  const hamburger = document.getElementById('hamburgerToggle');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'navMenu');

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   2. HEADER SCROLL SHRINK & BACKDROP BLUR
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

/* ==========================================================================
   3. ACTIVE NAV LINK DETECTION
   ========================================================================== */
function initActiveNavLink() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName || (pageName === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   3B. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.feature-card, .program-card, .trainer-card, .pricing-card, .review-card, .gallery-item, .stat-item, .contact-info-card');
  
  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================================================
   4. PROGRAM FILTER TABS
   ========================================================================== */
function initProgramFilters() {
  const filterBtns = document.querySelectorAll('.program-filter-btn');
  const programCards = document.querySelectorAll('.program-card');

  if (filterBtns.length > 0 && programCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        programCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category') || '';
          const categories = cardCategory.split(' ');
          if (category === 'all' || categories.includes(category) || cardCategory === category) {
            card.style.display = 'flex';
            setTimeout(() => { 
              card.style.opacity = '1'; 
              card.style.transform = ''; 
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => { card.style.display = 'none'; }, 200);
          }
        });
      });
    });
  }
}

/* ==========================================================================
   5. TRAINER FILTER TABS
   ========================================================================== */
function initTrainerFilters() {
  const filterBtns = document.querySelectorAll('.trainer-filter-btn');
  const trainerCards = document.querySelectorAll('.trainer-card');

  if (filterBtns.length > 0 && trainerCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const spec = btn.getAttribute('data-specialty');

        trainerCards.forEach(card => {
          const cardSpec = card.getAttribute('data-specialty');
          if (spec === 'all' || cardSpec === spec) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

/* ==========================================================================
   6. MEMBERSHIP PRICING TOGGLE (MONTHLY / QUARTERLY / HALF-YEARLY / YEARLY)
   ========================================================================== */
function initPricingToggle() {
  const durationTabs = document.querySelectorAll('.duration-tab');
  const priceElements = document.querySelectorAll('.pricing-price-val');
  const billingToggle = document.getElementById('billingToggle');

  if (durationTabs.length > 0 && priceElements.length > 0) {
    durationTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        durationTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const duration = tab.getAttribute('data-duration');

        priceElements.forEach(priceEl => {
          const val = priceEl.getAttribute(`data-${duration}`);
          if (val) {
            priceEl.textContent = val;
          }
        });

        const periodLabels = document.querySelectorAll('.pricing-period-label');
        periodLabels.forEach(lbl => {
          if (duration === 'monthly') lbl.textContent = '/ 1 month';
          else if (duration === 'quarterly') lbl.textContent = '/ 3 months';
          else if (duration === 'halfyearly') lbl.textContent = '/ 6 months';
          else if (duration === 'yearly') lbl.textContent = '/ 12 months';
        });
      });
    });
  }

  if (billingToggle && priceElements.length > 0) {
    billingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;

      priceElements.forEach(priceEl => {
        const monthlyPrice = priceEl.getAttribute('data-monthly');
        const annualPrice = priceEl.getAttribute('data-annual');

        if (isAnnual && annualPrice) {
          priceEl.textContent = `${annualPrice}`;
        } else if (monthlyPrice) {
          priceEl.textContent = `${monthlyPrice}`;
        }
      });
    });
  }
}


/* ==========================================================================
   7. GALLERY LIGHTBOX PREVIEW & CATEGORY FILTERING
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');

  // Category Filter Handler
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const itemCat = item.getAttribute('data-category') || '';
          const categories = itemCat.split(' ');
          if (category === 'all' || categories.includes(category) || itemCat === category) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = '';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Lightbox Click Handler
  if (galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const visibleItems = galleryItems.filter(el => el.style.display !== 'none');
        const visibleIndex = visibleItems.indexOf(item);
        openLightbox(visibleItems, visibleIndex >= 0 ? visibleIndex : index);
      });
    });
  }
}

let currentLightboxItems = [];
let currentLightboxIndex = 0;

function openLightbox(itemsList, startIndex) {
  currentLightboxItems = itemsList;
  currentLightboxIndex = startIndex;

  let lightbox = document.getElementById('lightboxModal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightboxModal';
    lightbox.className = 'modal-overlay';
    lightbox.innerHTML = `
      <div class="lightbox-modal-content">
        <span class="modal-close" id="closeLightbox">&times;</span>
        <button class="lightbox-nav-btn lightbox-prev" id="lightboxPrevBtn" aria-label="Previous Image">&lsaquo;</button>
        <button class="lightbox-nav-btn lightbox-next" id="lightboxNextBtn" aria-label="Next Image">&rsaquo;</button>
        
        <img id="lightboxImg" src="" style="width:100%; max-height: 72vh; object-fit: contain; border-radius: 8px; margin-bottom: 1rem;" alt="Gallery Large Preview">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
          <span id="lightboxBadge" class="badge" style="margin:0;"><span class="badge-dot"></span> <span id="lightboxTagText">EVOLUTION GYM</span></span>
          <h4 id="lightboxCaption" style="font-family: var(--font-display); font-weight: 800; text-transform: uppercase; color: var(--text-main); margin: 0;"></h4>
          <span id="lightboxCounter" style="color: var(--text-secondary); font-size: 0.85rem; font-weight: 700;"></span>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);

    // Event Listeners for Close & Navigation
    lightbox.querySelector('#closeLightbox').addEventListener('click', closeLightbox);
    lightbox.querySelector('#lightboxPrevBtn').addEventListener('click', prevLightboxImage);
    lightbox.querySelector('#lightboxNextBtn').addEventListener('click', nextLightboxImage);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard Navigation & Escape support
    document.addEventListener('keydown', handleLightboxKeydown);
  }

  updateLightboxContent();
  lightbox.classList.add('active');
}

function updateLightboxContent() {
  const lightbox = document.getElementById('lightboxModal');
  if (!lightbox || currentLightboxItems.length === 0) return;

  const currentItem = currentLightboxItems[currentLightboxIndex];
  const img = currentItem.querySelector('img');
  const caption = currentItem.getAttribute('data-title') || 'Evolution Gym Kathmandu';
  const tag = currentItem.getAttribute('data-tag') || 'GALLERY';

  const lightboxImg = lightbox.querySelector('#lightboxImg');
  const lightboxCaption = lightbox.querySelector('#lightboxCaption');
  const lightboxTagText = lightbox.querySelector('#lightboxTagText');
  const lightboxCounter = lightbox.querySelector('#lightboxCounter');

  if (img) lightboxImg.src = img.src;
  lightboxCaption.textContent = caption;
  lightboxTagText.textContent = tag.toUpperCase();
  lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxItems.length}`;
}

function prevLightboxImage() {
  if (currentLightboxItems.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxItems.length) % currentLightboxItems.length;
  updateLightboxContent();
}

function nextLightboxImage() {
  if (currentLightboxItems.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxItems.length;
  updateLightboxContent();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  if (lightbox) {
    lightbox.classList.remove('active');
  }
}

function handleLightboxKeydown(e) {
  const lightbox = document.getElementById('lightboxModal');
  if (lightbox && lightbox.classList.contains('active')) {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevLightboxImage();
    } else if (e.key === 'ArrowRight') {
      nextLightboxImage();
    }
  }
}

/* ==========================================================================
   8. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    if (header && body) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
            const otherBody = otherItem.querySelector('.faq-body');
            if (otherBody) otherBody.style.maxHeight = '0px';
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          body.style.maxHeight = '0px';
        } else {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    }
  });
}

/* ==========================================================================
   9. MODAL POPUPS & MEMBERSHIP TRIAL FORM
   ========================================================================== */
function initModals() {
  const passModal = document.getElementById('passModal');
  const openPassBtns = document.querySelectorAll('.open-pass-modal');
  const closeModalBtns = document.querySelectorAll('.modal-close');

  openPassBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (passModal) passModal.classList.add('active');
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) activeModal.classList.remove('active');
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
    }
  });

  const modalForm = document.getElementById('modalPassForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameEl = document.getElementById('passName');
      const phoneEl = document.getElementById('passPhone');
      
      const name = nameEl ? nameEl.value.trim() : '';
      const phone = phoneEl ? phoneEl.value.trim() : '';
      
      if (passModal) passModal.classList.remove('active');

      let trialMsg = WHATSAPP_CONFIG.messages.trial;
      if (name || phone) {
        trialMsg = `Hello Evolution Gym, my name is ${name || 'a visitor'}${phone ? ' (' + phone + ')' : ''}. I would like to book a trial workout session. Please let me know the available time and requirements.`;
      }
      
      openWhatsApp(trialMsg, `Opening WhatsApp to request trial session...`);
      modalForm.reset();
    });
  }
}

/* ==========================================================================
   CONFIGURABLE MAP & LOCATION CONSTANTS
   ========================================================================== */
const EVOLUTION_GYM_CONFIG = {
  name: "Evolution Gym",
  address: "Unnamed Road, Kathmandu, Bagmati Province 44600, Nepal",
  phone: "981-5813774",
  whatsappNumber: "9779815813774",
  openingHours: "Mon - Sat: 5:30 AM - 10:00 PM | Sun: 6:00 AM - 9:00 PM (Open until 10 PM daily)",
  mapsUrl: "https://maps.google.com/?q=Evolution+Gym,+Unnamed+Road,+Kathmandu,+Bagmati+Province+44600,+Nepal",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625953041!2d85.2911132!3d27.7089559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c15651880!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
};

/* ==========================================================================
   WHATSAPP CORE CONFIGURATION & HELPERS
   ========================================================================== */
const WHATSAPP_CONFIG = {
  number: '9779815813774',
  messages: {
    general: 'Hello Evolution Gym, I would like to know more about your membership plans and joining process.',
    hero: 'Hello Evolution Gym, I would like to know more about your membership plans and joining process.',
    trial: 'Hello Evolution Gym, I would like to book a trial workout session. Please let me know the available time and requirements.',
    pt: 'Hello Evolution Gym, I am interested in Personal Training 1-on-1 coaching. Please share trainer rates and session details.'
  }
};

/**
 * Global helper to launch WhatsApp with an encoded message string
 * @param {string} customMessage - Pre-filled text message
 * @param {string} [toastNotice] - Optional UI feedback message
 */
function openWhatsApp(customMessage, toastNotice) {
  const message = customMessage || WHATSAPP_CONFIG.messages.general;
  const encodedText = encodeURIComponent(message);
  const waUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedText}`;

  const notice = toastNotice || 'Opening WhatsApp to contact Evolution Gym...';
  showToast(notice, 'success');

  setTimeout(() => {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }, 350);
}

/**
 * Helper to open WhatsApp for a specific membership plan name
 */
function openWhatsAppPlan(planName) {
  const message = `Hello Evolution Gym, I am interested in the ${planName}. Please share the current price, facilities, and joining process.`;
  openWhatsApp(message, `Opening WhatsApp enquiry for ${planName}...`);
}

/* ==========================================================================
   10. CONTACT FORM -> WHATSAPP INTEGRATION
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const responseBox = document.getElementById('contactResponseBox');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('contactName');
      const phoneEl = document.getElementById('contactPhone');
      const programEl = document.getElementById('contactProgram');
      const messageEl = document.getElementById('contactMessage');

      const name = nameEl ? nameEl.value.trim() : '';
      const phone = phoneEl ? phoneEl.value.trim() : '';
      const program = programEl ? programEl.options[programEl.selectedIndex].text : 'General Inquiry';
      const userMsg = messageEl ? messageEl.value.trim() : '';

      if (!name || !phone) {
        showToast('Please provide your full name and phone number.', 'error');
        return;
      }

      // Generate structured WhatsApp message as per Requirement 4
      let waMessage = `Hello Evolution Gym,\n\nName: ${name}\nPhone: ${phone}\nInterested In: ${program}`;
      if (userMsg) {
        waMessage += `\n\nMessage:\n${userMsg}`;
      }
      waMessage += `\n\nI would like to know more about joining Evolution Gym.`;

      if (responseBox) {
        responseBox.style.display = 'block';
        responseBox.innerHTML = `
          <div style="background: rgba(37, 211, 102, 0.12); border: 1px solid #25d366; border-radius: var(--radius-md); padding: 1.25rem; margin-top: 1.5rem; text-align: left;">
            <div style="display: flex; align-items: center; gap: 0.5rem; color: #25d366; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.5rem;">
              <span>💬</span> Opening WhatsApp...
            </div>
            <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5; margin-bottom: 0.5rem;">
              Enquiry generated for <strong>${name}</strong> regarding <strong>${program}</strong>.
            </p>
            <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-bottom: 0;">
              WhatsApp will open in a new tab. If it doesn't open automatically, <a href="https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(waMessage)}" target="_blank" style="color: #25d366; font-weight: 700;">Click Here to Open WhatsApp</a>.
            </p>
          </div>
        `;
      }

      openWhatsApp(waMessage, `Opening WhatsApp with your enquiry details...`);
    });
  }
}

/* ==========================================================================
   11. FLOATING WHATSAPP BUTTON (EVERY PAGE)
   ========================================================================== */
function initFloatingWhatsApp() {
  if (document.getElementById('floatingWaBtn')) return;

  const btn = document.createElement('a');
  btn.id = 'floatingWaBtn';
  btn.className = 'floating-wa-btn';
  btn.href = '#';
  btn.setAttribute('aria-label', 'Chat with Evolution Gym on WhatsApp');
  btn.setAttribute('title', 'Chat with us on WhatsApp');

  btn.innerHTML = `
    <span class="wa-pulse-ring"></span>
    <svg class="wa-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12.031 2c-5.516 0-9.998 4.48-9.998 9.998 0 1.765.459 3.487 1.334 5.004L2 22l5.129-1.341c1.474.805 3.141 1.236 4.902 1.236 5.518 0 10.002-4.481 10.002-9.998 0-5.518-4.484-9.997-10.002-9.997zm0 18.291c-1.577 0-3.117-.42-4.453-1.214l-.319-.189-3.047.798.812-2.97-.207-.331a8.27 8.27 0 0 1-1.268-4.387c0-4.571 3.72-8.291 8.282-8.291 4.562 0 8.282 3.72 8.282 8.291 0 4.571-3.72 8.291-8.282 8.291zm4.542-6.208c-.249-.125-1.473-.727-1.701-.81-.229-.083-.396-.125-.562.125-.166.249-.645.81-.79 1.059-.145.249-.291.27-.54.145-.249-.125-1.052-.387-2.004-1.236-.741-.661-1.241-1.477-1.386-1.726-.145-.249-.015-.384.109-.507.112-.112.249-.291.374-.436.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.436-.062-.125-.562-1.352-.77-1.849-.203-.485-.409-.419-.562-.427l-.478-.009c-.166 0-.436.062-.665.312s-.873.852-.873 2.078c0 1.226.894 2.409 1.018 2.575.125.166 1.76 2.688 4.264 3.769.596.257 1.061.411 1.424.527.598.19 1.142.163 1.572.099.48-.071 1.473-.603 1.68-1.185.207-.582.207-1.08.145-1.185-.062-.104-.229-.166-.478-.291z"/>
    </svg>
    <span class="wa-text-label">WhatsApp</span>
    <span class="wa-tooltip">Chat with us on WhatsApp</span>
  `;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsApp(WHATSAPP_CONFIG.messages.general, 'Opening WhatsApp chat with Evolution Gym...');
  });

  document.body.appendChild(btn);
}

/* ==========================================================================
   12. WHATSAPP BUTTON DELEGATION
   ========================================================================== */
function initWhatsAppButtons() {
  document.addEventListener('click', (e) => {
    const waTarget = e.target.closest('.wa-btn, .wa-plan-btn, .wa-hero-btn, .wa-trial-btn');
    if (!waTarget) return;

    e.preventDefault();

    if (waTarget.classList.contains('wa-plan-btn') || waTarget.hasAttribute('data-plan')) {
      const planName = waTarget.getAttribute('data-plan') || 'Membership Plan';
      openWhatsAppPlan(planName);
    } else if (waTarget.classList.contains('wa-hero-btn')) {
      openWhatsApp(WHATSAPP_CONFIG.messages.hero, 'Opening WhatsApp for membership enquiry...');
    } else if (waTarget.classList.contains('wa-trial-btn')) {
      openWhatsApp(WHATSAPP_CONFIG.messages.trial, 'Opening WhatsApp to request trial session...');
    } else if (waTarget.hasAttribute('data-wa-message')) {
      openWhatsApp(waTarget.getAttribute('data-wa-message'));
    } else {
      openWhatsApp(WHATSAPP_CONFIG.messages.general);
    }
  });
}

/* ==========================================================================
   13. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const iconSpan = document.createElement('span');
  iconSpan.style.color = type === 'success' ? '#10b981' : (type === 'error' ? '#ff3b00' : '#f59e0b');
  iconSpan.style.fontWeight = 'bold';
  iconSpan.textContent = type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ');

  const textSpan = document.createElement('span');
  textSpan.textContent = message;

  toast.appendChild(iconSpan);
  toast.appendChild(textSpan);

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse forwards';
    setTimeout(() => { toast.remove(); }, 300);
  }, 4000);
}

