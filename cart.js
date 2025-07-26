// Simple Cart Management in localStorage

const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart-btn');
const checkoutBtn = document.getElementById('checkout-btn');

function loadCart() {
  let cart = JSON.parse(localStorage.getItem('shamlessCart')) || [];
  renderCart(cart);
}

function renderCart(cart) {
  cartList.innerHTML = '';
  if (cart.length === 0) {
    cartList.innerHTML = '<li>Your cart is empty.</li>';
    cartTotal.textContent = 'Total: $0.00';
    return;
  }
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.className = 'cart-item';

    li.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
      </div>
      <div class="cart-item-qty">Qty: ${item.qty}</div>
      <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      <div class="cart-item-remove" data-index="${index}" title="Remove item">&times;</div>
    `;
    cartList.appendChild(li);
  });
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  // Attach remove listeners
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      removeItemFromCart(parseInt(idx));
    });
  });
}

function removeItemFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('shamlessCart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('shamlessCart', JSON.stringify(cart));
  loadCart();
}

clearCartBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear the cart?')) {
    localStorage.removeItem('shamlessCart');
    loadCart();
  }
});

checkoutBtn.addEventListener('click', () => {
  alert('Checkout feature coming soon!');
});

// Initialize
loadCart();
