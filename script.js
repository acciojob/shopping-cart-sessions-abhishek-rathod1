const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear previous items
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Attach event listeners to add buttons
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      addToCart(parseInt(button.getAttribute("data-id")));
    });
  });
}

// Render cart
function renderCart() {
  cartList.innerHTML = ""; // Clear previous cart items
  const cartItems = JSON.parse(window.sessionStorage.getItem("cart")) || [];

  cartItems.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="remove-from-cart-btn" data-id="${product.id}">Remove from Cart</button>`;
    cartList.appendChild(li);
  });

  // Attach event listeners to remove buttons
  document.querySelectorAll(".remove-from-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      removeFromCart(parseInt(button.getAttribute("data-id")));
    });
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cartItems = JSON.parse(window.sessionStorage.getItem("cart")) || [];

  // Prevent duplicates
  if (cartItems.find(item => item.id === productId)) return;

  cartItems.push(product);
  window.sessionStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}


// Remove item from cart
function removeFromCart(productId) {
  let cartItems = JSON.parse(window.sessionStorage.getItem("cart")) || [];
  cartItems = cartItems.filter(item => item.id !== productId); // Removes all instances of the product
  window.sessionStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

// Clear cart
clearCartBtn.addEventListener("click", () => {
  window.sessionStorage.removeItem("cart");
  renderCart();
});

// Initial render
renderProducts();
renderCart();
