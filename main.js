// script.js
const display = document.getElementById('display');
const keyboardContainer = document.querySelector('.keyboard');

// Define keyboard layout
const keys = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
    ['O', 'P', 'Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z', ' ', '<i class="fas fa-trash"></i>'], // Bin icon for Clear
    ['<i class="fas fa-volume-up"></i>', '!', '?', '.', ',', '<i class="fas fa-backspace"></i>', '<i class="fas fa-paper-plane"></i>'] // Backspace icon
];

// Initialize speech synthesis
const synth = window.speechSynthesis;

// Function to add keys to the keyboard
function createKeyboard() {
    keys.forEach(row => {
        row.forEach(key => {
            const button = document.createElement('button');
            button.innerHTML = key.includes('<i') ? key : key; // Use innerHTML for icons
            button.onclick = () => handleButtonClick(key);
            if (key.includes('fa-volume-up')) button.classList.add('special');
            if (key.includes('fa-paper-plane')) button.classList.add('special');
            if (key.includes('fa-trash')) button.classList.add('special');
            if (key.includes('fa-backspace')) button.classList.add('special');
            keyboardContainer.appendChild(button);
        });
    });
}

// Handle button click
function handleButtonClick(key) {
    if (key.includes('fa-trash')) {
        display.textContent = ''; // Clear display
    } else if (key.includes('fa-backspace')) {
        display.textContent = display.textContent.slice(0, -1); // Remove last character
    } else if (key.includes('fa-volume-up')) {
        speakText(display.textContent); // Speak full text
    } else if (key.includes('fa-paper-plane')) {
        display.textContent += '\n'; // Add a new line
    } else {
        display.textContent += key; // Add the letter to the display
    }
}

// Speak the text in the display and clear after speaking
function speakText(text) {
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set language

        // Clear text after speaking
        utterance.onend = () => {
            display.textContent = ''; // Clear the display after speaking
        };

        synth.speak(utterance); // Speak the entire text
    }
}

// Initialize keyboard on load
createKeyboard();