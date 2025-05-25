const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const loginForm = document.getElementById('loginForm');

// Function to handle the switching between Login and Register forms
registerLink.onclick = () => {
    wrapper.classList.add('active');
};

loginLink.onclick = () => {
    wrapper.classList.remove('active');
};

// Handle login form submission
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get user input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulated login process (replace with actual API call)
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            // On successful login, redirect to previous page or profile
            const previousPage = localStorage.getItem('previousPage') || 'index.html'; // Default to homepage if not found
            window.location.href = previousPage;
        } else {
            // Handle login error
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
    });
});

// Store the previous page in localStorage before navigating to the login page
window.onbeforeunload = function() {
    localStorage.setItem('previousPage', document.referrer);
};
// Initialize cart array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to add an item to the cart
function addToCart(title, author, price) {
    const existingItem = cartItems.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if already in cart
    } else {
        cartItems.push({ title, author, price: parseFloat(price), quantity: 1 }); // Add new item
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save cart to local storage
    alert(`${title} has been added to your cart!`);
}

// Add event listeners to the buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const title = this.getAttribute('data-title');
        const author = this.getAttribute('data-author');
        const price = this.getAttribute('data-price');
        addToCart(title, author, price);
    });
});
// Function to send a message
function sendMessage() {
    const username = document.getElementById('username').value; // Replace with your username input ID
    const message = document.getElementById('messageInput').value; // Replace with your message input ID

    if (!username || !message) {
        alert('Please enter your username and message.');
        return;
    }

    // Make a POST request to the server
    fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, message }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // Handle success response
        document.getElementById('messageInput').value = ''; // Clear input field
        loadMessages(); // Optionally reload messages to display the new one
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}

// Event listener for the send button
document.getElementById('sendButton').addEventListener('click', sendMessage); // Replace with your send button ID
