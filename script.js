document.addEventListener('DOMContentLoaded', function() {

    // --- SÉLECTION DES ÉLÉMENTS HTML ---
    const launcher = document.querySelector('.chatbot-launcher');
    const chatWindow = document.querySelector('.chat-window');
    const closeBtn = document.querySelector('.chat-close-btn');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const messagesContainer = document.querySelector('.chat-messages');

    // --- ÉVÉNEMENTS ---
    launcher.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        const notification = document.querySelector('.chatbot-notification');
        if (notification) {
            notification.classList.remove('visible');
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        addMessage(userMessage, 'user');
        chatInput.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, 'bot');
        }, 800);
    });

    // --- FONCTIONS ---
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getBotResponse(userInput) {
        const input = userInput.toLowerCase();
        if (input.includes('bonjour') || input.includes('salut')) {
            return "Bonjour ! Je suis le guide NKA. Comment puis-je t'aider à explorer la creativité africaine ?";
        } else if (input.includes('expo') || input.includes('galerie') || input.includes('3d')) {
            return "L'exposition virtuelle 3D 'Couleurs d'Afrique' est une expérience immersive ! Tu peux y accéder depuis la page des catégories.";
        } else if (input.includes('peinture') || input.includes('musique') || input.includes('art')) {
            return "NKA célèbre de nombreuses formes d'art : peinture, musique, danse, sculpture, art hybride... Explore la page des catégories pour toutes les découvrir !";
        } else {
            return "Je peux te renseigner sur la galerie 3D, les peintures, la musique, et plus encore !";
        }
    }

    // Logique pour une notification UNIQUE par session de navigation
    function lancerNotification() {
        if (!sessionStorage.getItem('notificationShown')) {
            const notifDiv = document.createElement('div');
            notifDiv.className = 'chatbot-notification';
            notifDiv.textContent = "Psst ! Je suis là si tu as besoin d'un guide ! 👋";
            document.body.appendChild(notifDiv);

            setTimeout(() => {
                notifDiv.classList.add('visible');
            }, 1500);

            setTimeout(() => {
                notifDiv.classList.remove('visible');
            }, 8000);

            notifDiv.addEventListener('click', () => {
                notifDiv.classList.remove('visible');
            });

            sessionStorage.setItem('notificationShown', 'true');
        }
    }

    lancerNotification();
});