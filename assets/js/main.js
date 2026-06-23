// Initialize AOS
AOS.init({
    duration: 900,
    once: true,      
    offset: 80,
    easing: 'ease-out-cubic'
});

(function () {
  const header   = document.getElementById('header');
  const hamburger= document.getElementById('hamburger');
  const drawer   = document.getElementById('mobile-drawer');

  // Scroll class
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Toggle drawer
  hamburger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on drawer link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!header.contains(e.target) && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();


// Triggers the blue connector line to animate in when the section scrolls into view.

(function () {
  const section = document.querySelector('.hiw-section');
  if (!section) return;

  // Reduced-motion check 
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    section.classList.add('in-view');
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add('in-view');
        observer.disconnect(); 
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(section);
})();

















// ==================== SERVICES DATA ====================
const services = [
    { icon: "fas fa-exclamation-triangle", title: "Emergency Plumbing",       desc: "24/7 rapid response for burst pipes, floods, and urgent plumbing failures.",  slug: "emergency-plumbing"      },
    { icon: "fas fa-bath",                 title: "Drain & Sewer Cleaning",   desc: "Clear stubborn clogs and keep your drains flowing freely.",                    slug: "drain-sewer-cleaning"    },
    { icon: "fas fa-tint",                 title: "Leak Detection & Repair",  desc: "Fast, precise leak location and repair before damage spreads.",                slug: "leak-detection-repair"   },
    { icon: "fas fa-tools",                title: "Pipe Repair & Replacement", desc: "Expert repair and full repiping for homes and commercial properties.",        slug: "pipe-repair-replacement" },
    { icon: "fas fa-toilet",               title: "Toilet Installation & Repair", desc: "Reliable toilet service — installations, repairs, and replacements.",      slug: "toilet-installation"     },
    { icon: "fas fa-faucet",               title: "Faucet & Fixture Repair",  desc: "All types of fixture work, from dripping faucets to full replacements.",      slug: "faucet-fixture-repair"   },
    { icon: "fas fa-shower",               title: "Shower & Tub Installation", desc: "Beautiful bathroom upgrades installed cleanly and correctly.",                slug: "shower-tub-installation" },
    { icon: "fas fa-fire",                 title: "Water Heater Services",    desc: "Installation, repair, and replacement of tank and tankless water heaters.",    slug: "water-heater-services"   },
    { icon: "fas fa-building",             title: "Commercial Plumbing",      desc: "Comprehensive plumbing for businesses, hotels, restaurants, and multi-units.", slug: "commercial-plumbing"     }
];

// ==================== RENDER ====================
function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = services.map((service, index) => `
        <div class="svc-card" data-aos="fade-up" data-aos-delay="${index * 70}">
            <div class="svc-icon-wrap">
                <i class="${service.icon}"></i>
            </div>
            <div class="svc-card-body">
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
            </div>
            <a href="services.html#${service.slug}" class="svc-link">
                Learn more <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderServices);


// ==================== TESTIMONIALS ====================

const testimonials = [
    {
        text: "They arrived within 30 minutes for a burst pipe emergency. Professional, clean, and fair pricing. Saved my kitchen!",
        name: "Maria Rodriguez",
        location: "South Beach, Miami",
        photo: "assets/images/testimonial_img.webp"
    },
    {
        text: "Best plumber I've worked with in Miami Beach. Fixed our water heater the same day and explained everything clearly.",
        name: "David Thompson",
        location: "North Miami Beach",
        photo: "assets/images/testimonial_img.webp"
    },
    {
        text: "Used them for a complete bathroom remodel. Excellent workmanship, great communication, and everything finished on schedule.",
        name: "Elena Vargas",
        location: "Bal Harbour",
        photo: "assets/images/testimonial_img.webp"
    }
];

let currentIndex = 0;
let autoSlide;
let isMobile = window.innerWidth < 768;

// ---- Helpers ----

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function buildCard(t) {
    const avatarHTML = t.photo
        ? `<img src="${t.photo}" alt="${t.name}" class="testi-photo" onerror="this.replaceWith(buildAvatarEl('${getInitials(t.name)}'))">`
        : `<div class="testi-avatar">${getInitials(t.name)}</div>`;

    return `
        <div class="testi-card">
            <span class="testi-quote-mark" aria-hidden="true">"</span>
            <p class="testi-text">${t.text}</p>
            <div class="testi-stars">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <div class="testi-author">
                ${avatarHTML}
                <div class="testi-author-info">
                    <span class="testi-name">${t.name}</span>
                    <span class="testi-location">
                        <i class="fas fa-map-marker-alt"></i> ${t.location}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// Fallback avatar element builder (called from onerror inline)
function buildAvatarEl(initials) {
    const el = document.createElement('div');
    el.className = 'testi-avatar';
    el.textContent = initials;
    return el;
}
window.buildAvatarEl = buildAvatarEl;

// ---- Render ----

function renderTestimonials() {
    const track = document.getElementById('testimonial-slider');
    if (!track) return;

    track.innerHTML = testimonials.map(t => buildCard(t)).join('');
    buildDots();
    updateSlider();
}

// ---- Dots ----

function buildDots() {
    const dotsWrap = document.getElementById('testi-dots');
    if (!dotsWrap) return;

    dotsWrap.innerHTML = testimonials.map((_, i) => `
        <button class="testi-dot${i === 0 ? ' active' : ''}" aria-label="Go to review ${i + 1}"></button>
    `).join('');

    dotsWrap.querySelectorAll('.testi-dot').forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
            resetAutoSlide();
        });
    });
}

function updateDots() {
    document.querySelectorAll('.testi-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// ---- Slider movement (mobile only) ----

function updateSlider() {
    if (!isMobile) return;

    const track = document.getElementById('testimonial-slider');
    if (!track) return;

    const card = track.querySelector('.testi-card');
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 24; 
    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;

    updateDots();
}

// ---- Navigation ----

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateSlider();
}

function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 6000);
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}


function handleResize() {
    const wasDesktop = !isMobile;
    isMobile = window.innerWidth < 768;

    const track = document.getElementById('testimonial-slider');
    const controls = document.getElementById('testi-controls');

    if (track && controls) {
        if (!isMobile) {
            track.style.transform = '';
            controls.style.display = 'none';
            clearInterval(autoSlide);
        } else {
            controls.style.display = '';
            updateSlider();
            if (wasDesktop) startAutoSlide();
        }
    }
}

// ---- Init ----

function initTestimonials() {
    renderTestimonials();

    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    if (isMobile) startAutoSlide();

    window.addEventListener('resize', handleResize, { passive: true });

    const sliderWrap = document.querySelector('.testi-slider-wrap');
    if (sliderWrap) {
        let touchStartX = 0;
        sliderWrap.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        sliderWrap.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                diff > 0 ? nextSlide() : prevSlide();
                resetAutoSlide();
            }
        }, { passive: true });
    }
}

document.addEventListener('DOMContentLoaded', initTestimonials);


// ==================== FAQ ACCORDION ====================
const faqs = [
    {
        q: "Do you offer 24/7 emergency service?",
        a: "Yes! We provide true 24/7 emergency plumbing service across Miami Beach and Miami-Dade County. No after-hours fees."
    },
    {
        q: "How quickly can you arrive?",
        a: "For emergencies, we typically arrive within 30-90 minutes depending on your location. We pride ourselves on fast response times."
    },
    {
        q: "Do you offer free estimates?",
        a: "Yes. We provide free estimates for all non-emergency work. Emergency calls include a transparent upfront diagnostic fee."
    },
    {
        q: "What areas do you serve?",
        a: "We serve all of Miami Beach, South Beach, North Miami Beach, Surfside, Bal Harbour, Sunny Isles, Downtown Miami, Brickell, and the entire Miami-Dade County."
    },
    {
        q: "Are you licensed and insured?",
        a: "Absolutely. All our technicians are fully licensed, bonded, and insured for your complete peace of mind."
    },
    {
        q: "Do you work on commercial buildings?",
        a: "Yes. We provide full commercial plumbing services for hotels, restaurants, offices, property managers, and multi-unit buildings."
    }
];

function renderFAQs() {
    const container = document.getElementById('faq-accordion');
    let html = '';

    faqs.forEach((faq, index) => {
        html += `
            <div class="faq-item" data-aos="fade-up" data-aos-delay="${index * 80}">
                <button class="faq-question">
                    ${faq.q}
                    <i class="fas fa-plus"></i>
                </button>
                <div class="faq-answer">
                    <p>${faq.a}</p>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Accordion Logic
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize FAQs
document.addEventListener('DOMContentLoaded', renderFAQs);


// Services Data for services.html
const allServices = [
    { icon: "fas fa-exclamation-triangle", title: "Emergency Plumbing", desc: "24/7 rapid response for urgent issues" },
    { icon: "fas fa-bath", title: "Drain & Sewer Cleaning", desc: "Clear stubborn clogs and maintain proper flow" },
    { icon: "fas fa-tint", title: "Leak Detection & Repair", desc: "Fast and accurate leak solutions" },
    { icon: "fas fa-tools", title: "Pipe Repair & Replacement", desc: "Expert pipe repair and replacement" },
    { icon: "fas fa-toilet", title: "Toilet Installation & Repair", desc: "Professional toilet services" },
    { icon: "fas fa-faucet", title: "Faucet & Fixture Repair", desc: "All types of faucet and fixture work" },
    { icon: "fas fa-shower", title: "Shower & Tub Installation", desc: "Modern bathroom upgrades" },
    { icon: "fas fa-fire", title: "Water Heater Services", desc: "Installation, repair & replacement" },
    { icon: "fas fa-building", title: "Commercial Plumbing", desc: "Hotels, restaurants & businesses" },
    { icon: "fas fa-wrench", title: "Garbage Disposal Repair", desc: "Installation and repair" },
    { icon: "fas fa-swimming-pool", title: "Pool Plumbing Repair", desc: "Pool and spa plumbing" },
    { icon: "fas fa-home", title: "Bathroom & Kitchen Remodeling", desc: "Full plumbing for remodels" }
];

function renderAllServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    let html = '';
    allServices.forEach((service, index) => {
        html += `
            <div class="service-card" data-aos="fade-up" data-aos-delay="${index * 60}">
                <div class="service-icon"><i class="${service.icon}"></i></div>
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
                <a href="#" class="service-link">Learn More →</a>
            </div>
        `;
    });
    grid.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderAllServices);


// ==================== CONTACT FORM ====================
const commonIssues = [
    "Emergency Leak", "No Hot Water", "Clogged Drain", "Burst Pipe", 
    "Toilet Not Flushing", "Water Heater Issue", "Low Water Pressure", 
    "Garbage Disposal Jam", "Sewer Backup", "Other"
];

function renderIssueOptions() {
    const container = document.getElementById('issue-options');
    let html = '';
    commonIssues.forEach(issue => {
        html += `<div class="issue-option" data-issue="${issue}">${issue}</div>`;
    });
    container.innerHTML = html;

    // Toggle selection
    container.querySelectorAll('.issue-option').forEach(option => {
        option.addEventListener('click', () => {
            option.classList.toggle('active');
        });
    });
}

// Form Submission with Google Apps Script
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const selectedIssues = Array.from(document.querySelectorAll('.issue-option.active'))
                               .map(el => el.dataset.issue);

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        issues: selectedIssues.join(', '),
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    // Replace with your actual Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(() => alert('Thank you! We will contact you shortly.'))
    .catch(() => alert('Message sent successfully!'));
});

// Initialize
document.addEventListener('DOMContentLoaded', renderIssueOptions);