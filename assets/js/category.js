/* =============================================
   GIFTSITE — CATEGORY PAGE SCRIPT
   ============================================= */

let currentFilter = 'all';
let currentSort   = 'default';
let maxPrice      = 3000;
let minRating     = 0;
let currentPage   = 1;
const PER_PAGE    = 8;

// ===== BUILD SIDEBAR =====
function buildSidebar() {
  const ul = document.getElementById('sidebar-cats');
  if (!ul) return;
  ul.innerHTML = `<li><a href="category.html" class="sidebar-link ${currentFilter==='all'?'active':''}">All Gifts <span class="sidebar-count">200+</span></a></li>`;
  GS_CATEGORIES.forEach(cat => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="category.html?cat=${encodeURIComponent(cat.id)}" class="sidebar-link ${currentFilter===cat.id?'active':''}">
      ${cat.emoji} ${cat.label} <span class="sidebar-count">${cat.count}+</span>
    </a>`;
    ul.appendChild(li);
  });
}

// ===== FILTER & SORT =====
function getFilteredProducts() {
  let list = [...GS_PRODUCTS];
  if (currentFilter !== 'all') list = list.filter(p => p.category === currentFilter);
  list = list.filter(p => p.price <= maxPrice && p.rating >= minRating);
  switch (currentSort) {
    case 'price-low':  list.sort((a,b) => a.price - b.price);         break;
    case 'price-high': list.sort((a,b) => b.price - a.price);         break;
    case 'rating':     list.sort((a,b) => b.rating - a.rating);       break;
    case 'discount':   list.sort((a,b) => b.discount - a.discount);   break;
  }
  return list;
}

function render() {
  const all     = getFilteredProducts();
  const total   = all.length;
  const start   = (currentPage - 1) * PER_PAGE;
  const paged   = all.slice(start, start + PER_PAGE);

  const grid    = document.getElementById('products-grid');
  const empty   = document.getElementById('empty-state');
  const counter = document.getElementById('result-count');
  if (counter) counter.textContent = `${total} Product${total !== 1 ? 's' : ''}`;

  if (!paged.length) {
    if (grid)  grid.innerHTML = '';
    if (grid)  grid.classList.add('d-none');
    if (empty) empty.classList.remove('d-none');
  } else {
    if (grid)  { grid.classList.remove('d-none'); grid.innerHTML = paged.map(p => buildProductCard(p)).join(''); }
    if (empty) empty.classList.add('d-none');
  }

  renderPagination(total);
}

function renderPagination(total) {
  const pages = Math.ceil(total / PER_PAGE);
  const el    = document.getElementById('pagination');
  if (!el || pages <= 1) { if(el) el.innerHTML = ''; return; }

  let html = '';
  if (currentPage > 1) html += `<button class="page-btn" onclick="goPage(${currentPage-1})"><i class="fas fa-chevron-left"></i></button>`;
  for (let i = 1; i <= pages; i++) {
    html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="goPage(${i})">${i}</button>`;
  }
  if (currentPage < pages) html += `<button class="page-btn" onclick="goPage(${currentPage+1})"><i class="fas fa-chevron-right"></i></button>`;
  el.innerHTML = html;
}

function goPage(p) {
  currentPage = p;
  render();
  document.querySelector('.cat-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== PUBLIC FILTER FNS (called from HTML) =====
function quickFilter(cat, btn) {
  currentFilter = cat;
  currentPage   = 1;
  document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
  buildSidebar();
  render();
  // Update URL
  const url = new URL(window.location);
  if (cat === 'all') url.searchParams.delete('cat');
  else url.searchParams.set('cat', cat);
  window.history.replaceState({}, '', url);
}

function sortProducts(val) {
  currentSort = val;
  currentPage = 1;
  render();
}

function filterByPrice(val) {
  maxPrice  = Number(val);
  currentPage = 1;
  const lbl = document.getElementById('price-max-label');
  if (lbl) lbl.textContent = `₹${val}`;
  render();
}

function filterByRating(val) {
  minRating   = Number(val);
  currentPage = 1;
  render();
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  if (sb) {
    sb.classList.toggle('open');
    document.body.style.overflow = sb.classList.contains('open') ? 'hidden' : '';
  }
}

// ===== READ URL PARAMS =====
function readParams() {
  const params = new URLSearchParams(window.location.search);
  const cat    = params.get('cat');
  const search = params.get('search');

  if (cat) {
    currentFilter = cat;
    const titleEl = document.getElementById('page-cat-title');
    const subEl   = document.getElementById('page-cat-sub');
    const bcEl    = document.getElementById('breadcrumb-cat');
    if (titleEl) titleEl.textContent = cat + ' Gifts';
    if (subEl)   subEl.textContent   = `Explore our ${cat} collection`;
    if (bcEl)    bcEl.textContent    = cat;
    // Set active pill
    document.querySelectorAll('.filter-pill').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.trim().includes(cat));
    });
  }

  if (search) {
    const titleEl = document.getElementById('page-cat-title');
    const subEl   = document.getElementById('page-cat-sub');
    const bcEl    = document.getElementById('breadcrumb-cat');
    if (titleEl) titleEl.textContent = `Results for "${search}"`;
    if (subEl)   subEl.textContent   = 'Showing search results';
    if (bcEl)    bcEl.textContent    = 'Search';
    // Override filter for search
    const q = search.toLowerCase();
    window._searchQuery = q;
  }
}

// Override getFilteredProducts for search
const _origGetFiltered = getFilteredProducts;
function getFilteredProducts() {
  let list = _origGetFiltered();
  if (window._searchQuery) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(window._searchQuery) ||
      p.category.toLowerCase().includes(window._searchQuery) ||
      p.desc.toLowerCase().includes(window._searchQuery)
    );
  }
  return list;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  await Components.loadAll();
  readParams();
  buildSidebar();
  render();
  initReveal();
});
