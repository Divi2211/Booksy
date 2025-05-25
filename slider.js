const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 3000, // Slide changes every 3 seconds
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Chat functionality
  // Initial fetch of messages
  fetchMessages();
  const socket = io('http://localhost:3000'); // Ensure the port matches your Node.js server

socket.on('loadMessages', (messages) => {
    messages.forEach(msg => {
        displayMessage(msg.username, msg.message, msg.timestamp);
    });
});

socket.on('newMessage', (data) => {
    displayMessage(data.username, data.message, new Date());
});

function sendMessage() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    socket.emit('sendMessage', { username, message });
    document.getElementById('message').value = ''; // Clear input
}

function displayMessage(username, message, timestamp) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${username}</strong>: ${message} <small>${new Date(timestamp).toLocaleString()}</small>`;
    chatBox.appendChild(messageElement);
}
