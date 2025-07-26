const CART_KEY = 'shameless_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartCount() {
  const count = getCart().reduce((sum, c) => sum + c.qty, 0);
  document.getElementById('cart-count').textContent = count;
}

function addToCart(id, name, price) {
  const cart = getCart();
  const exist = cart.find(c => c.id === id);
  if (exist) exist.qty += 1;
  else cart.push({ id, name, price, qty: 1 });
  saveCart(cart);
  updateCartCount();
}

function renderCart() {
  const items = getCart();
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  if (items.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  let total = 0;
  items.forEach((c, i) => {
    const line = document.createElement('div');
    line.innerHTML = `
      <strong>${c.name}</strong> — $${c.price} × ${c.qty}
      <button data-index="${i}">Remove</button>`;
    container.appendChild(line);
    total += c.price * c.qty;
  });
  document.getElementById('cart-total').textContent = `Total: $${total}`;
  container.querySelectorAll('button').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.dataset.index);
      items.splice(idx, 1);
      saveCart(items);
      renderCart();
      updateCartCount();
    };
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('cart.html')) {
    renderCart();
    document.getElementById('checkout-btn').onclick = () => alert('Checkout flow coming soon!');
  }
});
