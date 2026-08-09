// ===== Main App Logic =====
let currentCategory = 'all';
let currentSearch = '';

// Render products
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  let filtered = PRODUCTS;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
      <div class="product-card__img">${p.emoji}</div>
      <div class="product-card__body">
        <div class="product-card__cat">${p.category}</div>
        <h3 class="product-card__name">${p.name}</h3>
        <div class="product-card__rating">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))} <span>(${p.reviews})</span></div>
        <div class="product-card__foot">
          <div class="product-card__price">$${p.price.toFixed(2)} <small>/ ${p.unit}</small></div>
          <button class="add-btn" onclick="addToCart(${p.id})" aria-label="Add ${p.name} to cart">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProducts(category) {
  currentCategory = category;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.category === category);
  });
  renderProducts();
}

function searchProducts(value) {
  currentSearch = value;
  renderProducts();
}

// UI toggles
function toggleMenu() {
  document.getElementById('nav').classList.toggle('open');
}
function toggleSearch() {
  const bar = document.getElementById('searchBar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) {
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
  }
}

// Toast
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Forms
function subscribeNewsletter(e) {
  e.preventDefault();
  e.target.reset();
  showToast('🎉 Subscribed! Check your email for 10% off code.');
}
function submitContact(e) {
  e.preventDefault();
  e.target.reset();
  showToast('✅ Message sent! We\'ll get back to you soon.');
}

// Close cart on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCart();
});

// Smooth scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      document.getElementById('nav').classList.remove('open');
    }
  });
});

// Init
renderProducts();
updateCartUI();
