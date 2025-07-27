// cart.js

// Key for localStorage
const CART_KEY = 'shamelessCart';

// Load cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElem = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

// Save cart to localStorage
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Calculate total price
function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Format price as string with 2 decimals
function formatPrice(price) {
  return price.toFixed(2);
}

// Render the cart UI
function renderCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p style="text-align:center; color:#a393d1;">Your cart is empty.</p>';
    cartTotalElem.textContent = '0.00';
    checkoutBtn.disabled = true;
    clearCartBtn.disabled = true;
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    itemDiv.innerHTML = `
      <span class="cart-name" title="${item.description || ''}">${item.name}</span>
      <div class="cart-qty">
        <button class="qty-decrease" aria-label="Decrease quantity">-</button>
        <span>${item.quantity}</span>
        <button class="qty-increase" aria-label="Increase quantity">+</button>
      </div>
      <span class="cart-price">$${formatPrice(item.price * item.quantity)}</span>
      <button class="remove-btn" aria-label="Remove item">&times;</button>
    `;

    // Quantity decrease
    itemDiv.querySelector('.qty-decrease').addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
        saveCart();
        renderCart();
      }
    });

    // Quantity increase
    itemDiv.querySelector('.qty-increase').addEventListener('click', () => {
      item.quantity++;
      saveCart();
      renderCart();
    });

    // Remove item
    itemDiv.querySelector('.remove-btn').addEventListener('click', () => {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });

    cartItemsContainer.appendChild(itemDiv);
  });

  const total = calculateTotal();
  cartTotalElem.textContent = formatPrice(total);
  checkoutBtn.disabled = false;
  clearCartBtn.disabled = false;
}

// Clear cart button handler
clearCartBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    saveCart();
    renderCart();
  }
});

// Checkout button handler
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  alert('Thank you for your purchase! Checkout process coming soon.');
  // Clear cart after checkout simulation
  cart = [];
  saveCart();
  renderCart();
});

// Initialize cart display on page load
renderCart();
