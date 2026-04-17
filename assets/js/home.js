/* =============================================
   GIFTSITE — HOME PAGE SCRIPT
   ============================================= */

// ===== HERO SLIDER =====
let heroIndex = 0;
let heroTimer;
const HERO_SLIDE_COUNT = 3;

function heroSlide(dir) {
  heroIndex = (heroIndex + dir + HERO_SLIDE_COUNT) % HERO_SLIDE_COUNT;
  applyHeroSlide();
  resetHeroTimer();
}
function heroGoTo(i) {
  heroIndex = i;
  applyHeroSlide();
  resetHeroTimer();
}
function applyHeroSlide() {
  const track = document.getElementById('hero-track');
  if (track) track.style.transform = `translateX(-${heroIndex * 100}%)`;
  document.querySelectorAll('.hero__dot').forEach((d, i) => {
    d.classList.toggle('active', i === heroIndex);
  });
}
function resetHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => heroSlide(1), 4500);
}
function initHero() {
  const dotsEl = document.getElementById('hero-dots');
  if (!dotsEl) return;
  for (let i = 0; i < HERO_SLIDE_COUNT; i++) {
    const btn = document.createElement('button');
    btn.className = 'hero__dot' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', `Slide ${i + 1}`);
    btn.addEventListener('click', () => heroGoTo(i));
    dotsEl.appendChild(btn);
  }
  resetHeroTimer();

  // Touch swipe
  let touchStart = 0;
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) heroSlide(diff > 0 ? 1 : -1);
    });
  }
}

// ===== CATEGORIES =====
function renderCategories() {
  const el = document.getElementById('categories-scroll');
  if (!el) return;
  el.innerHTML = GS_CATEGORIES.map(cat => `
    <a href="category.html?cat=${encodeURIComponent(cat.id)}" class="cat-card">
      <div class="cat-card__icon">${cat.emoji}</div>
      <div class="cat-card__name">${cat.label}</div>
      <div class="cat-card__count">${cat.count}+ Gifts</div>
    </a>`).join('');
}

// ===== PRODUCT SECTIONS =====
function renderSection(sectionId, filterFn, limit = 4) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const products = GS_PRODUCTS.filter(filterFn).slice(0, limit);
  el.innerHTML = products.map(p => buildProductCard(p)).join('');
}

function renderAllSections() {
  renderSection('bestsellers-grid', p => p.tags.includes('bestseller'));
  renderSection('newarrivals-grid', p => p.tags.includes('new'));
  renderSection('trending-grid',    p => p.tags.includes('trending'));
  renderSection('toprated-grid',    p => p.tags.includes('toprated'));
}

// ===== TESTIMONIALS =====
const TESTIMONIALS = [
  { name: 'Priya Sharma',  loc: 'Jaipur',   rating: 5, text: 'Ordered a personalized LED name lamp for my husband\'s birthday. The quality was incredible and delivery was super fast! Will definitely order again.', initial: 'P' },
  { name: 'Rahul Verma',   loc: 'Mumbai',   rating: 5, text: 'Got a couple frame for our anniversary. My wife absolutely loved it. The engraving was perfect and packaging was beautiful. 10/10 service!', initial: 'R' },
  { name: 'Anjali Singh',  loc: 'Delhi',    rating: 5, text: 'The wooden family name sign is just gorgeous! Exactly as shown in the picture. Great quality wood and the customer service was very helpful.', initial: 'A' },
  { name: 'Deepak Patel',  loc: 'Surat',   rating: 5, text: 'Bought via WhatsApp ordering which was super convenient. Got my star map print framed beautifully. Highly recommended!', initial: 'D' },
  { name: 'Sneha Iyer',    loc: 'Chennai',  rating: 5, text: 'My friend cried happy tears when she received the personalized photo cushion. GiftSite never disappoints. Best gifting site in India!', initial: 'S' },
  { name: 'Amit Khanna',   loc: 'Pune',     rating: 5, text: 'Ordered a neon name sign for our new home and it looks absolutely stunning. The colors are vibrant and it arrived well-packed. Love it!', initial: 'A' },
];
function renderTestimonials() {
  const el = document.getElementById('testimonials');
  if (!el) return;
  el.innerHTML = TESTIMONIALS.slice(0, 3).map(t => `
    <div class="testimonial-card reveal">
      <div class="testimonial-card__quote">"</div>
      <div class="testimonial-card__stars">${'★'.repeat(t.rating)}</div>
      <p class="testimonial-card__text">${t.text}</p>
      <div class="testimonial-card__author">
        <div class="testimonial-card__avatar">${t.initial}</div>
        <div>
          <div class="testimonial-card__name">${t.name}</div>
          <div class="testimonial-card__loc"><i class="fas fa-map-marker-alt" style="font-size:10px;color:var(--pink)"></i> ${t.loc}</div>
        </div>
      </div>
    </div>`).join('');
  // Re-observe new elements
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.testimonial-card.reveal').forEach(el => obs.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  // Load components first
  await Components.loadAll();

  // Then render page content
  initHero();
  renderCategories();
  renderAllSections();
  renderTestimonials();
  initReveal();
});
