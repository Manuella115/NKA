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

        // Salutations
        if (input.includes('bonjour') || input.includes('salut') || input.includes('hello')) {
            return "Bonjour ! Je suis le guide de NKA. Comment puis-je vous aider à explorer la créativité africaine aujourd'hui ?";
        
        // Question sur l'équipe
        } else if (input.includes('qui êtes-vous') || input.includes('équipe') || input.includes('créé par')) {
            return "NKA est un projet créé par une équipe de 5 jeunes femmes passionnées par la technologie et la richesse culturelle africaine. Vous pouvez en savoir plus sur la page 'À Propos' !";
        
        // Question sur le but du projet NKA
        } else if (input.includes('nka') || input.includes('projet') || input.includes('sert à quoi') || input.includes('mission')) {
            return "La mission de NKA est de rendre l'art africain accessible et amusant pour tous. Nous voulons être un pont entre le digital et le réel, pour donner envie de découvrir les expositions et les artistes près de chez vous.";
        
        // Question sur les catégories
        } else if (input.includes('catégories') || input.includes('types d\'art') || input.includes('trouve quoi')) {
            return "Sur NKA, vous pouvez explorer de nombreuses formes d'art : Peinture, Musique, Danse, Photographie, Sculpture, Masques traditionnels, Slam et même de l'Art Hybride comme la coiffure ou le design !";
        
        // Question sur la galerie 3D
        } else if (input.includes('galerie') || input.includes('3d') || input.includes('expo')) {
            return "Notre galerie virtuelle vous propose une exposition 3D immersive ! C'est une expérience unique pour découvrir des œuvres comme si vous y étiez. Le lien se trouve sur la page des catégories.";
        
        // Question sur l'espace artiste
        } else if (input.includes('artiste') || input.includes('inscrire') || input.includes('participer')) {
            return "L'Espace Artiste est une zone dédiée aux créateurs. Ils peuvent s'inscrire pour soumettre leurs œuvres et les faire découvrir à notre communauté. Le lien se trouve dans le pied de page du site.";

        // Politesse
        } else if (input.includes('merci')) {
            return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions.";
        
        // Réponse par défaut
        } else {
            return "C'est une excellente question. Je peux vous renseigner sur notre mission, l'équipe, la galerie 3D, l'espace artiste ou les différentes catégories d'art disponibles.";
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