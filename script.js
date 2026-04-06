/* =========================================
   GIFTRIXS — script.js
   Central JS: products data, navbar, slider,
   filter, detail page, auth validation.
   ========================================= */

// ── Product Data ──────────────────────────
const PRODUCTS = [
  {
    id: 1, name: "Luxury Rose Gold Hamper",
    category: "Birthday",
    price: 1499, originalPrice: 1999,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80",
    description: "An exquisite rose-gold gift hamper filled with artisan chocolates, scented candles, premium bath salts, and a personalised greeting card — the perfect birthday surprise.",
    rating: 4.8, reviews: 128,
    tags: ["Birthday","Love"]
  },
  {
    id: 2, name: "Personalised Couple Frame",
    category: "Anniversary",
    price: 699, originalPrice: 999,
    badge: "New",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&q=80",
    description: "A beautifully crafted wooden photo frame with laser-engraved couple names and date. A timeless memento for anniversaries and milestones.",
    rating: 4.7, reviews: 89,
    tags: ["Anniversary","Love"]
  },
  {
    id: 3, name: "Festive Diwali Gift Set",
    category: "Festival",
    price: 999, originalPrice: 1399,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?w=500&q=80",
    description: "Celebrate the festival of lights with our curated Diwali set: dry fruits, handmade diyas, premium mithai, and an eco-friendly tote.",
    rating: 4.9, reviews: 214,
    tags: ["Festival"]
  },
  {
    id: 4, name: "Starry Night Candle Set",
    category: "Love",
    price: 549, originalPrice: 799,
    badge: null,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&q=80",
    description: "Hand-poured soy-wax candles infused with jasmine, sandalwood, and rose — set the mood for a romantic evening.",
    rating: 4.6, reviews: 61,
    tags: ["Love","Birthday"]
  },
  {
    id: 5, name: "Gourmet Chocolate Box",
    category: "Birthday",
    price: 849, originalPrice: 1099,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80",
    description: "A decadent assortment of 24 handcrafted Belgian chocolates presented in a keepsake gift box — because the best things in life are sweet.",
    rating: 4.8, reviews: 175,
    tags: ["Birthday","Festival"]
  },
  {
    id: 6, name: "Memory Jar with Notes",
    category: "Love",
    price: 449, originalPrice: 599,
    badge: null,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
    description: "A glass jar filled with 52 handwritten love-note prompts. Each week, open one and create new memories together.",
    rating: 4.5, reviews: 44,
    tags: ["Love","Anniversary"]
  },
  {
    id: 7, name: "Corporate Welcome Kit",
    category: "Corporate",
    price: 1199, originalPrice: 1599,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80",
    description: "First-class corporate onboarding hamper: branded notebook, premium pen, desk succulent, mug, and personalised welcome letter.",
    rating: 4.7, reviews: 93,
    tags: ["Corporate"]
  },
  {
    id: 8, name: "Kids Wonder Box",
    category: "Birthday",
    price: 799, originalPrice: 999,
    badge: "New",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    description: "Packed with fun: colouring books, DIY craft kits, candy, and a personalised mini-backpack — perfect for little birthday stars.",
    rating: 4.9, reviews: 137,
    tags: ["Birthday"]
  },
  {
    id: 9, name: "Spa Bliss Hamper",
    category: "Love",
    price: 1099, originalPrice: 1499,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80",
    description: "Treat someone to the ultimate self-care experience with bath bombs, face masks, essential oils, herbal teas, and silk eye mask.",
    rating: 4.8, reviews: 108,
    tags: ["Love","Birthday"]
  },
  {
    id: 10, name: "Silver Anniversary Set",
    category: "Anniversary",
    price: 1899, originalPrice: 2499,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
    description: "Mark 25 years with style: engraved silver-plated wine glasses, gourmet jam set, and a beautifully framed anniversary message.",
    rating: 4.9, reviews: 57,
    tags: ["Anniversary"]
  },
  {
    id: 11, name: "Eid Celebration Box",
    category: "Festival",
    price: 899, originalPrice: 1199,
    badge: null,
    image: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=500&q=80",
    description: "Share the joy of Eid with our premium celebration box: sheer khurma mix, ittar, prayer beads, sweets, and festive packaging.",
    rating: 4.7, reviews: 82,
    tags: ["Festival"]
  },
  {
    id: 12, name: "Polaroid Photo Album",
    category: "Love",
    price: 599, originalPrice: 799,
    badge: null,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    description: "A linen-bound mini album for 60 Polaroid or instax prints, complete with washi tape stickers and a 12-page journal section.",
    rating: 4.6, reviews: 73,
    tags: ["Love","Anniversary"]
  }
];

const CATEGORIES = [
  { name: "Birthday",    icon: "🎂" },
  { name: "Anniversary", icon: "💍" },
  { name: "Love",        icon: "❤️" },
  { name: "Festival",    icon: "🪔" },
  { name: "Corporate",   icon: "💼" },
  { name: "Kids",        icon: "🧸" },
];

// ── Helpers ───────────────────────────────
const formatPrice = n => `₹${n.toLocaleString('en-IN')}`;
const discount    = (orig, sale) => Math.round((1 - sale/orig)*100);

function showToast(msg, duration = 2800) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ── Navbar Scroll & Hamburger ─────────────
function initNavbar() {
  const nav  = document.querySelector('.navbar');
  const ham  = document.querySelector('.hamburger');
  const mob  = document.querySelector('.mobile-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    const st = document.getElementById('scrollTop');
    if (st) st.classList.toggle('show', window.scrollY > 400);
  });

  if (ham && mob) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mob.classList.toggle('open');
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      ham.classList.remove('open'); mob.classList.remove('open');
    }));
  }

  const st = document.getElementById('scrollTop');
  if (st) st.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Hero Slider ───────────────────────────
const SLIDES = [
  {
    tag: "New Arrivals",
    title: "Gifts That<br>Tell Stories",
    desc: "Curated hampers and keepsakes for every milestone — delivered with love.",
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1400&q=80",
    cta: "Shop Now"
  },
  {
    tag: "Festival Special",
    title: "Celebrate Every<br>Occasion",
    desc: "From Diwali to birthdays — find the perfect gift in seconds.",
    img: "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?w=1400&q=80",
    cta: "Explore Gifts"
  },
  {
    tag: "Couples Collection",
    title: "Love Packed<br>Beautifully",
    desc: "Romantic hampers and personalised keepsakes for the ones you adore.",
    img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1400&q=80",
    cta: "View Collection"
  }
];

function buildSlider() {
  const track = document.querySelector('.slider-track');
  const dotsEl = document.querySelector('.slider-dots');
  if (!track) return;

  track.innerHTML = '';
  dotsEl.innerHTML = '';

  SLIDES.forEach((s, i) => {
    track.innerHTML += `
      <div class="slide">
        <img class="slide-bg" src="${s.img}" alt="${s.title.replace(/<br>/g,' ')}" loading="${i===0?'eager':'lazy'}">
        <div class="slide-overlay"></div>
        <div class="slide-content fade-up">
          <span class="slide-tag">${s.tag}</span>
          <h1>${s.title}</h1>
          <p>${s.desc}</p>
          <a href="products.html" class="btn-hero">${s.cta} <span>→</span></a>
        </div>
      </div>`;
    dotsEl.innerHTML += `<div class="dot${i===0?' active':''}" data-i="${i}"></div>`;
  });

  let cur = 0, timer;
  const dots = dotsEl.querySelectorAll('.dot');

  function goTo(n) {
    cur = (n + SLIDES.length) % SLIDES.length;
    track.style.transform = `translateX(-${cur*100}%)`;
    dots.forEach((d,i) => d.classList.toggle('active', i===cur));
  }
  function auto() { timer = setInterval(() => goTo(cur+1), 5000); }
  function reset() { clearInterval(timer); auto(); }

  dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.i); reset(); }));
  document.querySelector('.slider-prev')?.addEventListener('click', () => { goTo(cur-1); reset(); });
  document.querySelector('.slider-next')?.addEventListener('click', () => { goTo(cur+1); reset(); });
  auto();
}

// ── Categories ────────────────────────────
function buildCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-card reveal" onclick="filterByCategory('${c.name}')">
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
    </div>`).join('');
}

function filterByCategory(name) {
  localStorage.setItem('filterCat', name);
  window.location.href = 'products.html';
}

// ── Product Card HTML ─────────────────────
function productCardHTML(p) {
  const disc = discount(p.originalPrice, p.price);
  return `
    <div class="product-card reveal" onclick="openProduct(${p.id})">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <button class="product-fav" onclick="event.stopPropagation();addWish(${p.id})" title="Wishlist">♡</button>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-footer">
          <div class="product-price">
            ${formatPrice(p.price)}
            <span class="original">${formatPrice(p.originalPrice)}</span>
          </div>
          <button class="btn-view">View →</button>
        </div>
      </div>
    </div>`;
}

// ── Featured Products (homepage) ──────────
function buildFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 8);
  grid.innerHTML = featured.map(productCardHTML).join('');
}

// ── All Products Page ─────────────────────
let currentFilter = 'All';

function buildProductsPage() {
  const grid = document.getElementById('allProductsGrid');
  if (!grid) return;

  // Check if coming from category filter
  const saved = localStorage.getItem('filterCat');
  if (saved) { currentFilter = saved; localStorage.removeItem('filterCat'); }

  // Build filter tabs
  const tabs = document.getElementById('filterTabs');
  if (tabs) {
    const cats = ['All', ...new Set(PRODUCTS.map(p => p.category))];
    tabs.innerHTML = cats.map(c => `
      <button class="filter-tab${c===currentFilter?' active':''}" onclick="applyFilter('${c}')">${c}</button>
    `).join('');
  }

  renderProducts();
}

function applyFilter(cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.toggle('active', t.textContent === cat);
  });
  renderProducts();
}

function renderProducts(sortBy = 'default') {
  const grid = document.getElementById('allProductsGrid');
  if (!grid) return;

  let list = currentFilter === 'All'
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.category === currentFilter);

  if (sortBy === 'price-asc')  list.sort((a,b) => a.price - b.price);
  if (sortBy === 'price-desc') list.sort((a,b) => b.price - a.price);
  if (sortBy === 'rating')     list.sort((a,b) => b.rating - a.rating);

  const count = document.getElementById('resultsCount');
  if (count) count.textContent = `Showing ${list.length} products`;

  grid.innerHTML = list.length
    ? list.map(productCardHTML).join('')
    : '<p style="color:var(--mid);text-align:center;grid-column:1/-1;padding:3rem">No products found.</p>';

  initReveal();
}

// ── Open Product Detail ───────────────────
function openProduct(id) {
  localStorage.setItem('currentProduct', id);
  window.location.href = 'product.html';
}

// ── Product Detail Page ───────────────────
function buildProductDetail() {
  const wrap = document.getElementById('productDetail');
  if (!wrap) return;

  const id = parseInt(localStorage.getItem('currentProduct'));
  const p  = PRODUCTS.find(x => x.id === id);
  if (!p) { wrap.innerHTML = '<p style="text-align:center;padding:4rem">Product not found.</p>'; return; }

  // Update meta
  document.title = `${p.name} — Giftrixs`;

  const disc = discount(p.originalPrice, p.price);
  const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5-Math.round(p.rating));

  wrap.innerHTML = `
    <nav class="breadcrumb">
      <a href="index.html">Home</a>
      <span>/</span>
      <a href="products.html">Products</a>
      <span>/</span>
      ${p.name}
    </nav>
    <div class="product-detail-grid">
      <div class="product-gallery">
        <div class="product-main-img">
          <img src="${p.image}" alt="${p.name}" id="mainImg">
        </div>
        <div class="product-thumbs">
          ${[p.image,p.image,p.image].map((img,i) => `
            <div class="thumb${i===0?' active':''}" onclick="switchThumb(this, '${img}')">
              <img src="${img}" alt="thumb">
            </div>`).join('')}
        </div>
      </div>
      <div class="product-detail-info fade-in">
        <span class="cat-tag">${p.category}</span>
        <h1>${p.name}</h1>
        <div class="detail-price">
          <span class="price">${formatPrice(p.price)}</span>
          <span class="orig">${formatPrice(p.originalPrice)}</span>
          <span class="save">${disc}% OFF</span>
        </div>
        <div class="detail-rating">
          <span class="stars">${stars}</span>
          <strong>${p.rating}</strong>
          <span>(${p.reviews} reviews)</span>
        </div>
        <p class="detail-desc">${p.description}</p>
        <div class="detail-options">
          <label>Packaging Style</label>
          <div class="option-chips">
            <div class="chip active">Standard Box</div>
            <div class="chip">Gift Bag</div>
            <div class="chip">Luxury Wrap</div>
          </div>
        </div>
        <div class="detail-options">
          <label>Add a Message Card?</label>
          <div class="option-chips">
            <div class="chip active">No Thanks</div>
            <div class="chip">Add Free Card</div>
            <div class="chip">Premium Card (+₹99)</div>
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn-buy" onclick="buyNow(${p.id})">🛒 Buy Now</button>
          <button class="btn-wish" onclick="addWish(${p.id})" title="Add to Wishlist">♡</button>
        </div>
        <div class="detail-meta">
          <span>📦 <strong>Free delivery</strong> on orders above ₹999</span>
          <span>🔄 <strong>7-day returns</strong> guaranteed</span>
          <span>✅ In stock — ships within <strong>24 hours</strong></span>
        </div>
      </div>
    </div>`;

  // Related
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const relGrid = document.getElementById('relatedGrid');
  if (relGrid && related.length) {
    relGrid.innerHTML = related.map(productCardHTML).join('');
  }

  initReveal();
}

function switchThumb(el, src) {
  document.getElementById('mainImg').src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function buyNow(id) {
  showToast('✅ Added to cart! Redirecting to checkout...');
}

function addWish(id) {
  const p = PRODUCTS.find(x => x.id === id);
  showToast(`♡ "${p.name}" added to wishlist!`);
}

// ── Chips interaction ─────────────────────
document.addEventListener('click', e => {
  if (e.target.classList.contains('chip')) {
    const group = e.target.closest('.detail-options');
    group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
  }
});

// ── Scroll Reveal ─────────────────────────
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
    });
  }, { threshold: .1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── Sort handler (products page) ──────────
function handleSort(val) { renderProducts(val); }

// ── Auth Validation ───────────────────────
function validateLoginForm(e) {
  e.preventDefault();
  const credential = document.getElementById('credential').value.trim();
  const password   = document.getElementById('password').value.trim();
  const err        = document.getElementById('loginError');

  if (!credential || !password) {
    err.textContent = 'Please fill in all fields.';
    err.classList.add('show'); return;
  }
  if (password.length < 6) {
    err.textContent = 'Password must be at least 6 characters.';
    err.classList.add('show'); return;
  }
  err.classList.remove('show');
  e.target.submit();
}

function validateSignupForm(e) {
  e.preventDefault();
  const name     = document.getElementById('name').value.trim();
  const email    = document.getElementById('email').value.trim();
  const mobile   = document.getElementById('mobile').value.trim();
  const pass     = document.getElementById('password').value.trim();
  const confirm  = document.getElementById('confirm_password').value.trim();
  const err      = document.getElementById('signupError');

  if (!name || !email || !mobile || !pass || !confirm) {
    err.textContent = 'Please fill in all fields.'; err.classList.add('show'); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    err.textContent = 'Please enter a valid email address.'; err.classList.add('show'); return;
  }
  if (!/^[0-9]{10}$/.test(mobile)) {
    err.textContent = 'Mobile number must be 10 digits.'; err.classList.add('show'); return;
  }
  if (pass.length < 6) {
    err.textContent = 'Password must be at least 6 characters.'; err.classList.add('show'); return;
  }
  if (pass !== confirm) {
    err.textContent = 'Passwords do not match.'; err.classList.add('show'); return;
  }
  err.classList.remove('show');
  e.target.submit();
}

// ── Init ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  buildSlider();
  buildCategories();
  buildFeatured();
  buildProductsPage();
  buildProductDetail();
  initReveal();
});
