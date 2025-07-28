function loadCart() {
  const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const cartList = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  let total = 0;

  cartList.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    total += parseFloat(item.price);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeItem(index);
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function addToCart(name, price) {
  const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
  items.push({ name, price });
  localStorage.setItem("cartItems", JSON.stringify(items));
  alert(`${name} added to cart!`);
}

function removeItem(index) {
  const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
  items.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(items));
  loadCart();
}

function clearCart() {
  localStorage.removeItem("cartItems");
  loadCart();
}

if (document.readyState !== "loading") {
  loadCart();
} else {
  document.addEventListener("DOMContentLoaded", loadCart);
}
