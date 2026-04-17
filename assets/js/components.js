/* =============================================
   GIFTSITE — COMPONENT LOADER
   Dynamically injects header.html & footer.html
   ============================================= */

const Components = {

  /* Resolve relative path to /components/ */
  _resolve(filename) {
    // Works whether pages are in root or subfolders
    const depth = (window.location.pathname.match(/\//g) || []).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    return `${prefix}components/${filename}`;
  },

  async _fetch(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    return res.text();
  },

  async loadHeader(targetSelector = '#header-placeholder') {
    try {
      const html = await this._fetch(this._resolve('header.html'));
      const el = document.querySelector(targetSelector);
      if (el) {
        el.outerHTML = html;
        // Re-init after injection
        Cart.updateBadge();
        Wishlist.updateBadge();
        setActiveNav();
        initHeaderScroll();
        // Update login state
        const user = Auth.get();
        const loginEl = document.getElementById('login-btn-area');
        if (loginEl && user) {
          loginEl.innerHTML = `<a href="profile.html" class="header__login-btn"><i class="fas fa-user-circle"></i> ${user.name.split(' ')[0]}</a>`;
          const drawerLogin = document.getElementById('drawer-login-item');
          if (drawerLogin) drawerLogin.innerHTML = `<i class="fas fa-user-circle"></i> My Profile`;
          drawerLogin?.setAttribute('href', 'profile.html');
        }
        // Bind search enter key
        const si = document.getElementById('header-search-input');
        if (si) si.addEventListener('keydown', e => { if(e.key==='Enter') headerSearch(); });
      }
    } catch(err) {
      console.warn('Header load failed (expected in file:// mode):', err.message);
      // Fallback: render inline minimal header
      Components._renderFallbackHeader(targetSelector);
    }
  },

  async loadFooter(targetSelector = '#footer-placeholder') {
    try {
      const html = await this._fetch(this._resolve('footer.html'));
      const el = document.querySelector(targetSelector);
      if (el) {
        el.outerHTML = html;
        Cart.updateBadge();
        Wishlist.updateBadge();
      }
    } catch(err) {
      console.warn('Footer load failed (expected in file:// mode):', err.message);
    }
  },

  async loadAll() {
    await Promise.all([
      this.loadHeader(),
      this.loadFooter()
    ]);
  },

  _renderFallbackHeader(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.outerHTML = `
      <div class="announce-bar">
        <div class="announce-bar__inner">
          <div class="announce-bar__item"><i class="fas fa-gift"></i><span>Free Delivery Above ₹499 | Code GIFT20 for 20% OFF</span></div>
        </div>
      </div>
      <header class="header" id="main-header">
        <div class="container">
          <div class="header__top">
            <a href="index.html" class="header__logo">
              <div class="header__logo-icon"> <img src="assets/images/giftrixs full logo.png" alt="logo" class="header__logo-img"/></div>
              </a>
            <div class="header__search">
              <input type="text" id="header-search-input" placeholder="Search personalized gifts…"/>
              <button class="header__search-btn" onclick="headerSearch()"><i class="fas fa-search"></i></button>
            </div>
            <div class="header__actions">
              <a href="wishlist.html" class="header__icon-btn"><i class="fas fa-heart"></i><span class="header__count" data-wish-count>0</span></a>
              <a href="cart.html" class="header__icon-btn"><i class="fas fa-shopping-cart"></i><span class="header__count" data-cart-count>0</span></a>
              <div id="login-btn-area"><a href="login.html" class="header__login-btn"><i class="fas fa-user"></i> Login</a></div>
              <button class="header__menu-btn" onclick="openDrawer()"><i class="fas fa-bars"></i></button>
            </div>
          </div>
          <nav class="header__nav">
            <ul class="nav__list">
              <li class="nav__item"><a href="index.html" class="nav__link">Home</a></li>
              <li class="nav__item"><a href="category.html" class="nav__link">Categories</a></li>
              <li class="nav__item"><a href="category.html?cat=Family Gifts" class="nav__link">Family Gifts</a></li>
              <li class="nav__item"><a href="category.html?cat=Personalized" class="nav__link">Personalized Items</a></li>
              <li class="nav__item"><a href="category.html?cat=Frame" class="nav__link">Frames</a></li>
              <li class="nav__item"><a href="category.html?cat=Wood Gifts" class="nav__link">Wood Gifts</a></li>
              <li class="nav__item"><a href="category.html?cat=Lighting Gifts" class="nav__link">Lighting Gifts</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <div class="drawer-overlay" id="drawer-overlay" onclick="closeDrawer()"></div>
      <div class="side-drawer" id="side-drawer">
        <div class="side-drawer__head"><span class="side-drawer__logo">🎁 GiftSite</span><button class="side-drawer__close" onclick="closeDrawer()"><i class="fas fa-times"></i></button></div>
        <div class="side-drawer__body">
          <a href="index.html" class="drawer-nav-item"><i class="fas fa-home"></i> Home</a>
          <a href="category.html" class="drawer-nav-item"><i class="fas fa-th-large"></i> All Categories</a>
          <a href="cart.html" class="drawer-nav-item"><i class="fas fa-shopping-cart"></i> Cart</a>
          <a href="wishlist.html" class="drawer-nav-item"><i class="fas fa-heart"></i> Wishlist</a>
          <a href="login.html" class="drawer-nav-item"><i class="fas fa-user"></i> Login</a>
        </div>
      </div>`;
    Cart.updateBadge();
    Wishlist.updateBadge();
    initHeaderScroll();
    setActiveNav();
    const user = Auth.get();
    const loginEl = document.getElementById('login-btn-area');
    if (loginEl && user) {
      loginEl.innerHTML = `<a href="profile.html" class="header__login-btn"><i class="fas fa-user-circle"></i> ${user.name.split(' ')[0]}</a>`;
    }
  }
};

// ===== SEARCH =====
function headerSearch() {
  const q = document.getElementById('header-search-input')?.value?.trim();
  if (q) window.location.href = `category.html?search=${encodeURIComponent(q)}`;
}

function filterSearchResults(q) {
  const list = document.getElementById('search-results-list');
  if (!list) return;
  if (!q.trim()) { list.innerHTML = ''; return; }
  const results = GS_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 8);
  if (!results.length) {
    list.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-light)">No results for "${q}"</div>`;
    return;
  }
  list.innerHTML = results.map(p => `
    <a href="product.html?id=${p.id}" style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;transition:all 0.2s;text-decoration:none;color:var(--text-dark)" onmouseover="this.style.background='var(--grad-soft)'" onmouseout="this.style.background=''">
      <div style="width:42px;height:42px;background:var(--grad-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${p.emoji}</div>
      <div>
        <div style="font-size:13px;font-weight:600">${p.name}</div>
        <div style="font-size:11px;color:var(--text-light)">${p.category} · ₹${p.price}</div>
      </div>
    </a>`).join('');
}

function closeSearch() {
  document.getElementById('search-suggestions').style.display = 'none';
}
