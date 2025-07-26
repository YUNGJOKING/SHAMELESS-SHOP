// Simple cart system with localStorage persistence

const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const emptyMessageEl = document.getElementById('empty-message');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = JSON.parse(localStorage.getItem('shamelessCart')) || [];

// Utility: format price as $X.XX
function formatPrice(price) {
  return '$' + price.toFixed(2);
}

// Render cart items in table
function renderCart() {
  cartItemsEl.innerHTML = '';

  if (cart.length === 0) {
    emptyMessageEl.style.display = 'block';
    checkoutBtn.disabled = true;
    cartTotalEl.textContent = formatPrice(0);
    return;
  } else {
    emptyMessageEl.style.display = 'none';
    checkoutBtn.disabled = false;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input" />
      </td>
      <td>${formatPrice(item.price)}</td>
      <td>${formatPrice(subtotal)}</td>
      <td><button class="remove-btn" data-index="${index}" aria-label="Remove ${item.name}">&times;</button></td>
    `;

    cartItemsEl.appendChild(tr);
  });

  cartTotalEl.textContent = formatPrice(total);
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('shamelessCart', JSON.stringify(cart));
}

// Remove item handler
cartItemsEl.addEventListener('click', e => {
  if (e.target.classList.contains('remove-btn')) {
    const idx = parseInt(e.target.dataset.index);
    cart.splice(idx, 1);
    saveCart();
    renderCart();
  }
});

// Quantity change handler
cartItemsEl.addEventListener('input', e => {
  if (e.target.classList.contains('qty-input')) {
    const idx = parseInt(e.target.dataset.index);
    let val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) {
      val = 1;
      e.target.value = 1;
    }
    cart[idx].quantity = val;
    saveCart();
    renderCart();
  }
});

// Checkout click
checkoutBtn.addEventListener('click', () => {
  alert('Checkout is not implemented yet. This is a demo cart.');
  // In real scenario, redirect to payment gateway or process order.
});

// Initialize
renderCart();
