// ===== Cart Logic =====
let cart = JSON.parse(localStorage.getItem('freshfruit_cart') || '[]');

function saveCart() {
  localStorage.setItem('freshfruit_cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, emoji: product.emoji, price: product.price, unit: product.unit, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`${product.name} added to cart 🛒`);
  // Pulse cart icon
  const btn = document.querySelector('.cart-btn');
  btn.style.transform = 'scale(1.2)';
  setTimeout(() => btn.style.transform = '', 200);
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
  }
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
  showToast('Cart cleared');
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartItemsCount').textContent = count;
  document.getElementById('cartTotal').textContent = '$' + getCartTotal().toFixed(2);

  const itemsEl = document.getElementById('cartItems');
  const footEl = document.getElementById('cartFoot');

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.<br><a href="#shop" onclick="closeCart()">Start shopping →</a></p>';
    footEl.hidden = true;
  } else {
    footEl.hidden = false;
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item__img">${item.emoji}</div>
        <div class="cart-item__info">
          <h4>${item.name}</h4>
          <div class="price">$${item.price.toFixed(2)} / ${item.unit}</div>
          <div class="cart-item__qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item__remove" onclick="removeFromCart(${item.id})" aria-label="Remove">🗑️</button>
      </div>
    `).join('');
  }
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function checkout() {
  if (cart.length === 0) return;
  const total = getCartTotal().toFixed(2);
  showToast(`🎉 Order placed! Total: $${total}. Demo checkout complete.`);
  clearCart();
  closeCart();
}
