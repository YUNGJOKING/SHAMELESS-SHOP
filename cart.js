// cart.js

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTable = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');
  cartTable.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td><button onclick="removeFromCart(${index})">Remove</button></td>
    `;
    cartTable.appendChild(row);
    total += parseFloat(item.price);
  });

  totalPriceEl.innerText = `$${total.toFixed(2)}`;
}

function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const price = btn.getAttribute('data-price');
      addToCart(name, price);
    });
  });

  if (document.getElementById('cart-items')) {
    loadCart();
  }
});
