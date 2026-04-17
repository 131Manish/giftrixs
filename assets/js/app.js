/* =============================================
   GIFTSITE — PRODUCTS DATA & UTILITIES
   ============================================= */

// ===== PRODUCT DATABASE =====
const GS_PRODUCTS = [
  { id: 1,  name: 'Personalized Heart Name LED Frame', price: 599,  oldPrice: 999,  discount: 40, rating: 4.8, reviews: 234, category: 'Frame',          emoji: '🖼️', badge: 'Best Seller', tags: ['bestseller'],             desc: 'A beautifully crafted heart-shaped LED frame with your names engraved. Premium quality wood with warm LED backlighting. Perfect for anniversaries and weddings.' },
  { id: 2,  name: 'Custom LED Acrylic Name Lamp',      price: 799,  oldPrice: 1299, discount: 38, rating: 4.9, reviews: 412, category: 'Lighting Gifts',   emoji: '💡', badge: 'Trending',    tags: ['new','trending'],          desc: 'Personalized acrylic LED lamp with your name or couple name. USB powered, 7-color changing light. Perfect bedside gift.' },
  { id: 3,  name: 'Wedding Memory Shadow Box',          price: 899,  oldPrice: 1499, discount: 40, rating: 4.7, reviews: 189, category: 'Wedding',          emoji: '💒', badge: 'Hot',         tags: ['bestseller','toprated'],   desc: 'Elegant shadow box frame with custom wedding date, couple names, and decorative elements. Handcrafted with love.' },
  { id: 4,  name: 'Couple Name Rustic Wood Plaque',     price: 649,  oldPrice: 999,  discount: 35, rating: 4.6, reviews: 156, category: 'Wood Gifts',       emoji: '🌳', badge: 'Sale',        tags: ['trending'],                desc: 'Rustic wooden plaque with couple names and special date. Natural finish, perfect for home décor.' },
  { id: 5,  name: 'Premium Birthday Gift Hamper Box',   price: 1299, oldPrice: 1999, discount: 35, rating: 4.9, reviews: 567, category: 'Birthday',         emoji: '🎁', badge: 'Best Seller', tags: ['bestseller','toprated'],   desc: 'Curated gift hamper with 5 premium personalized items: frame, lamp, keychain, mug, and greeting card.' },
  { id: 6,  name: 'Anniversary Photo Cushion',          price: 449,  oldPrice: 699,  discount: 36, rating: 4.5, reviews: 298, category: 'Anniversary',      emoji: '💕', badge: 'Sale',        tags: ['trending'],                desc: 'Soft customized cushion with couple photo print. Machine washable, super soft velvet fabric.' },
  { id: 7,  name: 'Personalized Photo Magic Mug',       price: 349,  oldPrice: 549,  discount: 36, rating: 4.7, reviews: 834, category: 'Birthday',         emoji: '☕', badge: 'Popular',     tags: ['bestseller'],              desc: 'High-quality ceramic magic mug with your custom photo and name. Dishwasher safe, 350ml capacity.' },
  { id: 8,  name: 'Large Family Name Wood Sign',         price: 1099, oldPrice: 1699, discount: 35, rating: 4.8, reviews: 123, category: 'Family Gifts',     emoji: '🏡', badge: 'New',         tags: ['new'],                     desc: 'Handcrafted family name wall sign with individual member names. Solid pine wood, easy wall mount.' },
  { id: 9,  name: 'Couple Star Map Custom Print',       price: 749,  oldPrice: 1199, discount: 38, rating: 4.9, reviews: 203, category: 'Lovers',           emoji: '🌟', badge: 'Trending',    tags: ['trending','toprated'],     desc: 'Custom star map showing the exact night sky on your special date. Museum-quality framed print.' },
  { id: 10, name: 'Baby Name LED Soft Nightlight',      price: 699,  oldPrice: 1099, discount: 36, rating: 5.0, reviews: 89,  category: 'Lighting Gifts',   emoji: '🌙', badge: 'New',         tags: ['new','toprated'],          desc: 'Adorable personalized baby name nightlight. USB powered, soft warm glow. Perfect baby shower gift.' },
  { id: 11, name: 'Rose Gold Name Keychain Set',        price: 299,  oldPrice: 499,  discount: 40, rating: 4.6, reviews: 445, category: 'Anniversary',      emoji: '🔑', badge: 'Sale',        tags: ['bestseller'],              desc: 'Premium stainless steel couple keychain set with name engraving. Rose gold finish, gift-boxed.' },
  { id: 12, name: 'Custom Neon Name Sign LED',          price: 1899, oldPrice: 2999, discount: 37, rating: 4.8, reviews: 67,  category: 'Lighting Gifts',   emoji: '✨', badge: 'Premium',     tags: ['toprated','trending'],     desc: 'Handmade LED neon sign with your name or quote. Wall-mountable, energy-efficient, remote control.' },
  { id: 13, name: 'Wedding Date Engraved Platter',      price: 849,  oldPrice: 1299, discount: 35, rating: 4.7, reviews: 112, category: 'Wedding',          emoji: '💍', badge: 'Hot',         tags: ['trending'],                desc: 'Personalized wooden serving platter engraved with wedding date and couple names. Food-safe finish.' },
  { id: 14, name: 'Personalized Name Bracelet Silver',  price: 549,  oldPrice: 849,  discount: 35, rating: 4.8, reviews: 276, category: 'Lovers',           emoji: '💎', badge: 'New',         tags: ['new','bestseller'],        desc: 'Sterling silver name bracelet with delicate script engraving. Comes in premium gift box.' },
  { id: 15, name: 'Family 9-Photo Collage Frame',        price: 1199, oldPrice: 1899, discount: 37, rating: 4.9, reviews: 178, category: 'Family Gifts',     emoji: '👨‍👩‍👧‍👦', badge: 'Best Seller', tags: ['bestseller','toprated'],  desc: 'Beautiful 9-photo collage frame with family name engraved. Solid MDF frame, easy wall mount.' },
  { id: 16, name: 'Personalized Leather Wallet',        price: 799,  oldPrice: 1299, discount: 38, rating: 4.6, reviews: 156, category: 'Personalized',     emoji: '👛', badge: 'Sale',        tags: ['trending'],                desc: 'Premium genuine leather wallet with name engraving. Slim design, multiple card slots.' },
  { id: 17, name: 'Wooden Name Puzzle Gift',             price: 549,  oldPrice: 849,  discount: 35, rating: 4.7, reviews: 93,  category: 'Wood Gifts',       emoji: '🧩', badge: 'New',         tags: ['new'],                     desc: 'Custom wooden name puzzle pieces. Laser-engraved, safe for all ages. Beautiful gift box included.' },
  { id: 18, name: 'Anniversary Scrapbook Album',        price: 999,  oldPrice: 1599, discount: 37, rating: 4.8, reviews: 67,  category: 'Anniversary',      emoji: '📸', badge: 'Hot',         tags: ['toprated'],                desc: 'Premium handmade scrapbook album with personalized cover. Perfect for memories and milestone events.' },
  { id: 19, name: 'Birthday Number Frame Set',           price: 449,  oldPrice: 699,  discount: 36, rating: 4.5, reviews: 321, category: 'Birthday',         emoji: '🎂', badge: 'Sale',        tags: ['trending'],                desc: 'Personalized birthday number frame with photo insert and custom message. Perfect milestone gift.' },
  { id: 20, name: 'Personalized Constellation Map',     price: 849,  oldPrice: 1399, discount: 39, rating: 4.9, reviews: 145, category: 'Personalized',     emoji: '🌌', badge: 'Premium',     tags: ['bestseller','toprated'],   desc: 'Custom constellation map with your special date and location. High-quality poster with elegant frame.' },
];

// ===== CATEGORIES =====
const GS_CATEGORIES = [
  { id: 'Wedding',        label: 'Wedding',          emoji: '💍', count: 42 },
  { id: 'Anniversary',    label: 'Anniversary',      emoji: '💕', count: 55 },
  { id: 'Birthday',       label: 'Birthday',         emoji: '🎂', count: 80 },
  { id: 'Lovers',         label: 'Lovers',           emoji: '❤️', count: 37 },
  { id: 'Family Gifts',   label: 'Family',           emoji: '👨‍👩‍👧‍👦', count: 62 },
  { id: 'Frame',          label: 'Frames',           emoji: '🖼️', count: 46 },
  { id: 'Wood Gifts',     label: 'Wood Gifts',       emoji: '🌳', count: 31 },
  { id: 'Lighting Gifts', label: 'LED Gifts',        emoji: '💡', count: 28 },
  { id: 'Personalized',   label: 'Personalized',     emoji: '✍️', count: 90 },
];

// ===== WHATSAPP NUMBER =====
const WA_NUMBER = '919876543210';

// ===== LOCAL STORAGE KEYS =====
const LS = {
  CART:     'gs_cart',
  WISHLIST: 'gs_wishlist',
  USER:     'gs_user',
};

// ===== CART =====
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem(LS.CART) || '[]'); } catch { return []; } },
  save(data) { localStorage.setItem(LS.CART, JSON.stringify(data)); },
  add(productId) {
    const items = Cart.get();
    const p = GS_PRODUCTS.find(x => x.id === productId);
    if (!p) return;
    const ex = items.find(x => x.id === productId);
    if (ex) ex.qty++;
    else items.push({ ...p, qty: 1 });
    Cart.save(items);
    Cart.updateBadge();
    Toast.show('success', `🛍️ ${p.name.substring(0,30)}... added!`);
  },
  remove(productId) {
    const items = Cart.get().filter(x => x.id !== productId);
    Cart.save(items);
    Cart.updateBadge();
  },
  updateQty(productId, delta) {
    const items = Cart.get();
    const item = items.find(x => x.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) Cart.remove(productId);
    else { Cart.save(items); Cart.updateBadge(); }
  },
  total() {
    return Cart.get().reduce((sum, i) => sum + i.price * i.qty, 0);
  },
  count() {
    return Cart.get().reduce((sum, i) => sum + i.qty, 0);
  },
  updateBadge() {
    const c = Cart.count();
    document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = c);
  }
};

// ===== WISHLIST =====
const Wishlist = {
  get() { try { return JSON.parse(localStorage.getItem(LS.WISHLIST) || '[]'); } catch { return []; } },
  save(data) { localStorage.setItem(LS.WISHLIST, JSON.stringify(data)); },
  toggle(productId) {
    const items = Wishlist.get();
    const idx = items.indexOf(productId);
    if (idx > -1) {
      items.splice(idx, 1);
      Toast.show('info', '💔 Removed from wishlist');
    } else {
      items.push(productId);
      Toast.show('success', '❤️ Added to wishlist!');
    }
    Wishlist.save(items);
    Wishlist.updateBadge();
    return idx === -1; // true = added
  },
  has(productId) { return Wishlist.get().includes(productId); },
  count() { return Wishlist.get().length; },
  updateBadge() {
    const c = Wishlist.count();
    document.querySelectorAll('[data-wish-count]').forEach(el => el.textContent = c);
  }
};

// ===== AUTH =====
const Auth = {
  get() { try { return JSON.parse(localStorage.getItem(LS.USER) || 'null'); } catch { return null; } },
  set(user) { localStorage.setItem(LS.USER, JSON.stringify(user)); },
  logout() { localStorage.removeItem(LS.USER); },
  isLoggedIn() { return !!Auth.get(); }
};

// ===== TOAST =====
const Toast = {
  show(type, msg, duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { success:'check', error:'times', info:'info', wa:'whatsapp' };
    const t = document.createElement('div');
    t.className = `toast toast--${type}`;
    t.innerHTML = `<div class="toast__icon"><i class="fas fa-${icons[type]||'info'}"></i></div><span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(30px)';
      t.style.transition = 'all 0.3s ease';
      setTimeout(() => t.remove(), 300);
    }, duration);
  }
};

// ===== WHATSAPP =====
const WA = {
  buyProduct(productId) {
    const p = GS_PRODUCTS.find(x => x.id === productId);
    if (!p) return;
    const msg = encodeURIComponent(
      `Hello GiftSite! 🎁\n\nI want to order this product:\n\nProduct Name: ${p.name}\nProduct ID: #${p.id}\nPrice: ₹${p.price}\nLink: ${window.location.href}\n\nPlease confirm availability. Thank you!`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    Toast.show('wa', 'Opening WhatsApp...');
  },
  checkout() {
    const items = Cart.get();
    if (!items.length) { Toast.show('error', '⚠️ Your cart is empty!'); return; }
    const total = Cart.total();
    const list = items.map(i => `• ${i.name} x${i.qty} = ₹${i.price * i.qty}`).join('\n');
    const msg = encodeURIComponent(
      `Hello GiftSite! 🎁\n\nI'd like to place an order:\n\n${list}\n\n💰 Total: ₹${total}\n\nPlease confirm my order. Thank you!`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  }
};

// ===== PRODUCT CARD HTML =====
function buildProductCard(p, small = false) {
  const inWL = Wishlist.has(p.id);
  const badgeClass = p.badge === 'New' ? 'badge-new' : p.badge === 'Hot' ? 'badge-hot' : p.badge === 'Trending' ? 'badge-trending' : 'badge-sale';
  return `
  <div class="product-card" onclick="goToProduct(${p.id})" data-id="${p.id}">
    <div class="product-card__img">
      <div class="product-card__emoji">${p.emoji}</div>
      ${p.badge ? `<div class="product-card__badge"><span class="badge-pill ${badgeClass}">${p.badge}</span></div>` : ''}
      <div class="product-card__actions">
        <button class="product-card__action-btn ${inWL?'active':''}" onclick="event.stopPropagation();toggleWishlistCard(${p.id},this)" title="Wishlist">
          <i class="fa${inWL?'s':'r'} fa-heart"></i>
        </button>
        <button class="product-card__action-btn" onclick="event.stopPropagation();quickViewProduct(${p.id})" title="Quick View">
          <i class="far fa-eye"></i>
        </button>
        <button class="product-card__action-btn" onclick="event.stopPropagation();Cart.add(${p.id})" title="Add to Cart">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="product-card__free-del"><i class="fas fa-truck"></i> Free Delivery</div>
    </div>
    <div class="product-card__body">
      <div class="product-card__name">${p.name}</div>
      <div class="product-card__rating">
        <div class="stars">${renderStars(p.rating)}</div>
        <span class="rating-count">(${p.reviews})</span>
      </div>
      <div class="product-card__price">
        <span class="price-now">₹${p.price}</span>
        <span class="price-old">₹${p.oldPrice}</span>
        <span class="price-off">${p.discount}% off</span>
      </div>
      <button class="product-card__cta" onclick="event.stopPropagation();Cart.add(${p.id})">
        <i class="fas fa-shopping-cart"></i> Add to Cart
      </button>
    </div>
  </div>`;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '★'.repeat(full);
  if (half) s += '½';
  return s || '☆☆☆☆☆';
}

// ===== CARD INTERACTIONS =====
function toggleWishlistCard(id, btn) {
  const added = Wishlist.toggle(id);
  btn.classList.toggle('active', added);
  btn.innerHTML = `<i class="fa${added?'s':'r'} fa-heart"></i>`;
  if (added) btn.style.color = 'var(--pink)';
  else btn.style.color = '';
}

function goToProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// ===== QUICK VIEW MODAL =====
function quickViewProduct(id) {
  const p = GS_PRODUCTS.find(x => x.id === id);
  if (!p) return;
  let modal = document.getElementById('gs-quick-view');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'gs-quick-view';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(45,27,61,0.6);backdrop-filter:blur(6px);z-index:4000;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn 0.25s ease';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div style="background:white;border-radius:24px;max-width:700px;width:100%;max-height:90vh;overflow-y:auto;padding:28px;position:relative;animation:fadeUp 0.3s ease">
      <button onclick="document.getElementById('gs-quick-view').remove()" style="position:absolute;top:16px;right:16px;width:32px;height:32px;background:var(--grad-soft);border:none;border-radius:50%;cursor:pointer;font-size:14px;color:var(--text-mid)"><i class="fas fa-times"></i></button>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start">
        <div style="height:260px;background:var(--grad-soft);border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:100px">${p.emoji}</div>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--pink);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">${p.category}</div>
          <h2 style="font-family:'Playfair Display',serif;font-size:20px;font-weight:900;margin-bottom:10px">${p.name}</h2>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px">
            <span style="color:#FFBB00">${renderStars(p.rating)}</span>
            <span style="font-size:12px;color:var(--text-light)">(${p.reviews} reviews)</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
            <span class="price-now" style="font-size:24px">₹${p.price}</span>
            <span class="price-old">₹${p.oldPrice}</span>
            <span class="price-off">${p.discount}% off</span>
          </div>
          <p style="font-size:13px;color:var(--text-light);line-height:1.7;margin-bottom:18px">${p.desc}</p>
          <div style="display:flex;flex-direction:column;gap:10px">
            <button class="btn btn-primary btn-block" onclick="Cart.add(${p.id});document.getElementById('gs-quick-view').remove()"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
            <button class="btn btn-wa btn-block" onclick="WA.buyProduct(${p.id})"><i class="fab fa-whatsapp"></i> Buy via WhatsApp</button>
            <a href="product.html?id=${p.id}" class="btn btn-outline btn-block" style="text-align:center">View Full Details →</a>
          </div>
        </div>
      </div>
    </div>`;
  modal.addEventListener('click', e => { if(e.target === modal) modal.remove(); });
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== MOBILE DRAWER =====
function openDrawer() {
  document.getElementById('side-drawer')?.classList.add('open');
  document.getElementById('drawer-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  document.getElementById('side-drawer')?.classList.remove('open');
  document.getElementById('drawer-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== ACTIVE NAV =====
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .drawer-nav-item').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href && path.includes(href.split('?')[0])) link.classList.add('active');
  });
}

// ===== URL PARAMS =====
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// ===== FORMAT CURRENCY =====
function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// ===== INIT COMMON =====
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  Wishlist.updateBadge();
  initReveal();
  initHeaderScroll();
  setActiveNav();

  // Header login state
  const user = Auth.get();
  const loginBtnEl = document.getElementById('login-btn-area');
  if (loginBtnEl && user) {
    loginBtnEl.innerHTML = `<a href="profile.html" class="header__login-btn"><i class="fas fa-user-circle"></i> ${user.name.split(' ')[0]}</a>`;
  }
});
