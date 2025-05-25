// Initialize cart if it doesn't exist
if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// Add item to cart
function addToCart(title, price) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const itemIndex = cart.findIndex(item => item.title === title);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ title: title, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update cart item count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = cartCount;
}

// Load cart count on page load
window.onload = updateCartCount;
// Display cart items
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <h4>${item.title}</h4>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${itemTotal}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("cart-total").textContent = total;
}

// Remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Mock checkout function
function checkout() {
    alert("Proceeding to checkout...");
    localStorage.removeItem("cart"); // Clear cart
    displayCart(); // Refresh display
    updateCartCount(); // Reset cart count
}

// Load cart display on page load
window.onload = displayCart;
// Sample data: Replace this with data pulled from your database or selection process
const cartItems = [
    { title: "Verity", author: "Colleen Hoover", price: 42.00, quantity: 1 },
    { title: "The Girl Who Knew Too Much", author: "Vikrant Khanna", price: 38.00, quantity: 1 },
    { title: "You Only Live Once", author: "Stuti Changle", price: 30.00, quantity: 1 }
];

// Function to render cart items and update total price
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Clear current items

    let totalPrice = 0;

    // Loop through each item in the cart
    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        // Create HTML structure for each item
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <h4>${item.title}</h4>
            <p>Author: ${item.author}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <div class="quantity-control">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <p>Subtotal: $${itemTotal.toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total price
    document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;
}

// Function to update quantity
function updateQuantity(index, change) {
    const item = cartItems[index];
    item.quantity += change;

    // Ensure quantity doesn't fall below 1
    if (item.quantity < 1) {
        item.quantity = 1;
    }

    renderCart(); // Re-render cart with updated quantity
}

// Initial render of cart
renderCart();
