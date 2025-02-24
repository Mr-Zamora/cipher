// Embedded messages
const messages = {
    sampleMessages: [
        "HELLO WORLD",
        "CRYPTOGRAPHY",
        "SECRET MESSAGE",
        "CAESAR CIPHER",
        "ENCRYPTION KEY"
    ],
    placeholderText: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    successMessages: [
        "Great job! You cracked the code!",
        "Success! Message decrypted!",
        "Excellent work, cryptographer!"
    ]
};

let currentTab = 'encrypt';

// Set a random placeholder message
document.getElementById('encrypt-message').placeholder = 
    messages.sampleMessages[Math.floor(Math.random() * messages.sampleMessages.length)];

// Tab switching logic
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentTab = button.dataset.tab;
        
        document.getElementById('encrypt-panel').style.display = currentTab === 'encrypt' ? 'block' : 'none';
        document.getElementById('decrypt-panel').style.display = currentTab === 'decrypt' ? 'block' : 'none';
    });
});

function animateText(element, finalText, duration = 1500) {
    element.innerHTML = '';
    const chars = finalText.split('');
    
    chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char;
        element.appendChild(span);
        
        if (char === ' ') {
            span.style.width = '1em';
            return;
        }

        // Start the spinning animation after a delay for each character
        setTimeout(() => {
            span.classList.add('spinning');
            
            // Change letters rapidly during spin
            const intervalId = setInterval(() => {
                span.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }, 50);

            // Show final letter after spin animation
            setTimeout(() => {
                clearInterval(intervalId);
                span.textContent = char;
            }, 1200); // Slightly less than animation duration
        }, index * 200); // Stagger start of each letter
    });
}

function encrypt(text, key) {
    return text.split('').map(char => {
        if (char === ' ') return ' ';
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + key) % 26) + 65);
        }
        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + key) % 26) + 97);
        }
        return char;
    }).join('');
}

function decrypt(text, key) {
    return encrypt(text, 26 - key);
}

function handleEncrypt() {
    const message = document.getElementById('encrypt-message').value.toUpperCase();
    const key = parseInt(document.getElementById('encrypt-key').value);
    
    if (!message || isNaN(key) || key < 1 || key > 25) {
        alert('Please enter a valid message and key (1-25)');
        return;
    }
    
    // Force uppercase before encryption
    document.getElementById('encrypt-message').value = message;
    const encrypted = encrypt(message, key);
    const resultElement = document.getElementById('encrypt-result');
    animateText(resultElement, encrypted);
}

function handleDecrypt() {
    const message = document.getElementById('decrypt-message').value.toUpperCase();
    const key = parseInt(document.getElementById('decrypt-key').value);
    
    if (!message || isNaN(key) || key < 1 || key > 25) {
        alert('Please enter a valid message and key (1-25)');
        return;
    }
    
    // Force uppercase before decryption
    document.getElementById('decrypt-message').value = message;
    const decrypted = decrypt(message, key);
    const resultElement = document.getElementById('decrypt-result');
    const successElement = document.getElementById('success-message');
    
    animateText(resultElement, decrypted);
    
    // Check if it's a known message (for demo purposes)
    if (messages.sampleMessages.includes(decrypted)) {
        setTimeout(() => {
            successElement.textContent = messages.successMessages[
                Math.floor(Math.random() * messages.successMessages.length)
            ];
            successElement.classList.add('visible');
        }, 1000);
    } else {
        successElement.classList.remove('visible');
    }
}

// Add click handlers for the message displays
document.addEventListener('DOMContentLoaded', () => {
    const encryptResult = document.getElementById('encrypt-result');
    const decryptResult = document.getElementById('decrypt-result');

    encryptResult.addEventListener('click', () => copyMessage(encryptResult));
    decryptResult.addEventListener('click', () => copyMessage(decryptResult));
});

function copyMessage(element) {
    // Get text content including spaces
    const text = element.textContent.trim();
    
    // Create temporary textarea to handle copying
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  // Prevent scrolling
    textarea.style.opacity = 0;
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    try {
        document.execCommand('copy');
        // Show copied feedback
        element.classList.add('copied');
        setTimeout(() => {
            element.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
    
    // Cleanup
    document.body.removeChild(textarea);
}
