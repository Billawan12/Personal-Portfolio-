// Toggle Mobile Menu Functionality
function toggleMobileMenu() {
    document.getElementById("menu").classList.toggle("active");
}

// API URL for the backend (local or deployed)
const API_URL = "http://localhost:5502/chat"; // Update with the correct backend URL if deployed

// Event Listener for Sending Messages
document.querySelector('.chat-message button').addEventListener('click', handleUserInput);
document.querySelector('.chat-message input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserInput();
});

// Handle User Input
async function handleUserInput() {
    const inputField = document.querySelector('.chat-message input');
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    addMessage('user', userMessage); // Display user message
    inputField.value = ''; // Clear input field
    await fetchChatbotResponse(userMessage); // Get bot response
}

// Add Message to Chat Log
function addMessage(sender, message) {
    const chatLog = document.getElementById('chat-log');
    const messageItem = document.createElement('li');
    messageItem.innerHTML = `<span class="avatar ${sender}">${sender === 'user' ? 'User' : 'AI'}</span>
                             <div class="message">${message}</div>`;
    chatLog.appendChild(messageItem);
    chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll
}

// Fetch Chatbot Response from Backend
async function fetchChatbotResponse(userMessage) {
    addMessage('bot', 'Typing...'); // Temporary typing indicator
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
        });
        const data = await response.json();
        // Update the typing message with the actual response
        document.querySelector('.message:last-child').innerText = data.reply;
    } catch (error) {
        console.error(error);
        document.querySelector('.message:last-child').innerText =
            'Sorry, something went wrong. Please try again later.';
    }
}
