const CART_KEY = 'shameless_cart';

function getCart() { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); }
function updateCartCount() {
  document.getElementById('cart-count').textContent = getCart().reduce((s,i)=>s+i.qty, 0);
}
function addToCart(id,name,price) {
  const cart = getCart();
  const found = cart.find(i=>i.id===id);
  if(found) found.qty++;
  else cart.push({id,name,price,qty:1});
  saveCart(cart);
  updateCartCount();
}

function renderCart() {
  const items = getCart();
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  if (!items.length) return container.innerHTML='<p>Your cart is empty.</p>';
  let total=0;
  items.forEach((i,idx)=> {
    const div=document.createElement('div');
    div.innerHTML = `<strong>${i.name}</strong> — $${i.price} × ${i.qty}
      <button data-idx="${idx}">Remove</button>`;
    container.appendChild(div);
    total+=i.price*i.qty;
  });
  document.getElementById('cart-total').textContent = 'Total: $'+total;
  container.querySelectorAll('button').forEach(btn => btn.onclick = ()=>{
    items.splice(btn.dataset.idx,1);
    saveCart(items); renderCart(); updateCartCount();
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  if (location.pathname.endsWith('cart.html')) {
    renderCart();
    document.getElementById('checkout-btn').onclick = () => alert('Checkout coming soon!');
  }
});
