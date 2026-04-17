/* =============================================
   GIFTSITE — PRODUCT DETAIL SCRIPT
   ============================================= */

let currentProduct = null;
const SIZES   = ['Small (8×8")', 'Medium (10×12")', 'Large (14×16")', 'XL (18×20")'];
const DESIGNS = ['Classic', 'Modern', 'Rustic', 'Floral', 'Minimal', 'Premium'];
const THUMB_EMOJIS = ['🎁', '✨', '💝', '🎀'];
let selectedSize   = SIZES[1];
let selectedDesign = DESIGNS[0];

// ===== RENDER PRODUCT =====
function renderProduct(p) {
  document.title = `${p.name} – GiftSite 🎁`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = p.desc;

  // Breadcrumb
  const bcCat  = document.getElementById('bc-cat');
  const bcName = document.getElementById('bc-name');
  if (bcCat)  { bcCat.textContent = p.category; bcCat.href = `category.html?cat=${encodeURIComponent(p.category)}`; }
  if (bcName) bcName.textContent = p.name;

  const inWL = Wishlist.has(p.id);

  document.getElementById('product-detail').innerHTML = `
    <!-- GALLERY -->
    <div class="product-detail__gallery">
      <div class="gallery-main" id="gallery-main">
        <span id="gallery-main-emoji" style="font-size:130px;transition:all 0.3s ease">${p.emoji}</span>
        <button class="gallery-zoom-btn" onclick="zoomImage('${p.emoji}')" title="Zoom">
          <i class="fas fa-search-plus"></i>
        </button>
      </div>
      <div class="gallery-thumbs" id="gallery-thumbs">
        ${[p.emoji, ...THUMB_EMOJIS].map((e,i) => `
          <div class="gallery-thumb ${i===0?'active':''}" onclick="selectThumb(this,'${e}')">
            <span style="font-size:28px">${e}</span>
          </div>`).join('')}
      </div>
    </div>

    <!-- INFO -->
    <div class="product-detail__info">
      <a href="category.html?cat=${encodeURIComponent(p.category)}" class="detail-cat-tag">
        <i class="fas fa-tag"></i> ${p.category}
      </a>

      <h1 class="detail-title">${p.name}</h1>

      <div class="detail-rating-row">
        <span class="detail-rating-stars">${'★'.repeat(Math.floor(p.rating))}</span>
        <span class="detail-rating-num">${p.rating}</span>
        <span class="detail-reviews">(${p.reviews} verified reviews)</span>
        <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
      </div>

      <div class="detail-price-row">
        <span class="detail-price-now">₹${p.price}</span>
        <span class="detail-price-old">₹${p.oldPrice}</span>
        <span class="detail-price-save">Save ₹${p.oldPrice - p.price} (${p.discount}% off)</span>
      </div>
      <div class="detail-free-del">
        <i class="fas fa-truck" style="color:#2E7D32"></i> Free Delivery | Ships in 24–48 hours
      </div>

      <p class="detail-desc">${p.desc}</p>

      <!-- SIZE -->
      <div class="detail-option-label">
        Select Size: <span id="selected-size-label">${selectedSize}</span>
      </div>
      <div class="size-options">
        ${SIZES.map((s,i) => `
          <button class="size-opt ${i===1?'active':''}" onclick="selectSize(this,'${s}')">${s}</button>
        `).join('')}
      </div>

      <!-- DESIGN -->
      <div class="detail-option-label">
        Select Design: <span id="selected-design-label">${selectedDesign}</span>
      </div>
      <div class="design-options">
        ${DESIGNS.map((d,i) => `
          <button class="design-opt ${i===0?'active':''}" onclick="selectDesign(this,'${d}')">${d}</button>
        `).join('')}
      </div>

      <!-- ACTIONS -->
      <div class="detail-actions">
        <div class="detail-row">
          <button class="btn btn-primary" style="flex:1" onclick="Cart.add(${p.id})">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <button class="btn btn-dark" style="flex:1" onclick="buyNow(${p.id})">
            <i class="fas fa-bolt"></i> Buy Now
          </button>
        </div>
        <button class="btn btn-wa btn-block" onclick="WA.buyProduct(${p.id})">
          <i class="fab fa-whatsapp" style="font-size:18px"></i> Buy via WhatsApp
        </button>
        <div class="detail-row">
          <button class="btn btn-outline" style="flex:1" id="wishlist-btn" onclick="toggleDetailWishlist(${p.id})">
            <i class="fa${inWL?'s':'r'} fa-heart"></i>
            <span id="wl-btn-text">${inWL?'Wishlisted':'Add to Wishlist'}</span>
          </button>
          <button class="btn btn-outline" style="flex:1" onclick="shareProduct()">
            <i class="fas fa-share-alt"></i> Share
          </button>
        </div>
      </div>

      <!-- META -->
      <div class="detail-meta">
        <div class="detail-meta-item"><i class="fas fa-truck"></i> Free Delivery</div>
        <div class="detail-meta-item"><i class="fas fa-undo-alt"></i> 7-Day Returns</div>
        <div class="detail-meta-item"><i class="fas fa-shield-alt"></i> Secure Payment</div>
        <div class="detail-meta-item"><i class="fas fa-palette"></i> Handcrafted</div>
        <div class="detail-meta-item"><i class="fas fa-award"></i> Premium Quality</div>
        <div class="detail-meta-item"><i class="fas fa-clock"></i> Made to Order</div>
      </div>

      <!-- SHARE -->
      <div class="share-row">
        <span class="share-label">Share:</span>
        <a href="https://wa.me/?text=${encodeURIComponent('Check this gift: '+p.name+' - '+window.location.href)}" target="_blank" class="share-btn" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn" title="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(p.name)}&url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn" title="Twitter"><i class="fab fa-twitter"></i></a>
        <button class="share-btn" onclick="copyLink()" title="Copy Link"><i class="fas fa-link"></i></button>
      </div>

    </div><!-- /.info -->`;
}

// ===== GALLERY =====
function selectThumb(el, emoji) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const main = document.getElementById('gallery-main-emoji');
  if (main) {
    main.style.opacity = '0';
    main.style.transform = 'scale(0.85)';
    setTimeout(() => {
      main.textContent = emoji;
      main.style.opacity = '1';
      main.style.transform = 'scale(1)';
    }, 180);
  }
}

function zoomImage(emoji) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(45,27,61,0.85);backdrop-filter:blur(8px);z-index:5000;display:flex;align-items:center;justify-content:center;cursor:zoom-out;animation:fadeIn 0.2s ease';
  overlay.innerHTML = `<div style="font-size:200px;animation:popIn 0.3s ease">${emoji}</div>`;
  overlay.addEventListener('click', () => overlay.remove());
  document.body.appendChild(overlay);
}

// ===== OPTIONS =====
function selectSize(btn, size) {
  selectedSize = size;
  document.querySelectorAll('.size-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const lbl = document.getElementById('selected-size-label');
  if (lbl) lbl.textContent = size;
}
function selectDesign(btn, design) {
  selectedDesign = design;
  document.querySelectorAll('.design-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const lbl = document.getElementById('selected-design-label');
  if (lbl) lbl.textContent = design;
}

// ===== WISHLIST =====
function toggleDetailWishlist(id) {
  const added = Wishlist.toggle(id);
  const btn = document.getElementById('wishlist-btn');
  const txt = document.getElementById('wl-btn-text');
  if (btn && txt) {
    btn.querySelector('i').className = `fa${added?'s':'r'} fa-heart`;
    txt.textContent = added ? 'Wishlisted' : 'Add to Wishlist';
    if (added) btn.style.background = 'var(--pink-pale)';
    else btn.style.background = '';
  }
}

// ===== BUY NOW =====
function buyNow(id) {
  Cart.add(id);
  setTimeout(() => {
    WA.buyProduct(id);
  }, 400);
}

// ===== SHARE =====
function shareProduct() {
  if (navigator.share) {
    navigator.share({
      title: currentProduct?.name || 'GiftSite',
      text: `Check out this personalized gift: ${currentProduct?.name}`,
      url: window.location.href
    });
  } else {
    copyLink();
  }
}
function copyLink() {
  navigator.clipboard.writeText(window.location.href)
    .then(() => Toast.show('success', '🔗 Link copied to clipboard!'))
    .catch(() => Toast.show('info', 'Copy this URL: ' + window.location.href));
}

// ===== SIMILAR PRODUCTS =====
function renderSimilar(p) {
  const el = document.getElementById('similar-grid');
  if (!el) return;
  const similar = GS_PRODUCTS
    .filter(x => x.id !== p.id && (x.category === p.category || x.tags.some(t => p.tags.includes(t))))
    .slice(0, 4);
  if (!similar.length) {
    document.getElementById('similar-section')?.classList.add('d-none');
    return;
  }
  el.innerHTML = similar.map(s => buildProductCard(s)).join('');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  await Components.loadAll();

  const id = parseInt(getParam('id'));
  const p  = GS_PRODUCTS.find(x => x.id === id);

  if (!p) {
    document.getElementById('product-detail').innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state__icon">😔</div>
        <h3 class="empty-state__title">Product Not Found</h3>
        <p class="empty-state__text">The product you're looking for doesn't exist or has been removed.</p>
        <a href="category.html" class="btn btn-primary">Browse All Gifts</a>
      </div>`;
    return;
  }

  currentProduct = p;
  renderProduct(p);
  renderSimilar(p);
  initReveal();
});
