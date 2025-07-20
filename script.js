document.addEventListener('DOMContentLoaded', function() {

    // --- CONFIGURATION ---
// ⚠️ Collez votre nouvelle clé API ici !
const API_KEY = "AIzaSyB5hpqq-jeLkK_zkcSDCOtwZiK4iXY97BU"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
// Le "cerveau" du chatbot : sa personnalité et ses connaissances
const SYSTEM_PROMPT = `Tu es le "Guide NKA", un chatbot expert, amical et passionné pour le site web "NKA". Ta mission est de faire découvrir la créativité africaine de manière amusante. Le projet a été créé par 5 jeunes femmes passionnées de tech. Le site NKA a plusieurs sections : Peintures, Musique, Danse, Art Hybride, Slam, Masques, Sculptures, et Photographie. Il y a aussi une galerie virtuelle 3D immersive et un Espace Artiste pour que les créateurs partagent leurs œuvres. Tes règles sont : 1. Ton ton est toujours positif et encourageant. 2. Réponds à toutes les questions sur le projet NKA, sa mission, l'équipe, et l'art africain en général. 3. Si on te demande des activités, demande le pays de l'utilisateur pour lui faire des suggestions locales. 4. À la fin des conversations, mentionne l'exposition 3D en cours : 'Couleurs d'Afrique'.`;
 // --- GESTION DE L'HISTORIQUE DE CONVERSATION ---
let conversationHistory = [];

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
        conversationHistory.push({ role: "user", parts: [{ text: userMessage }] });
        chatInput.value = '';

        // On appelle directement la nouvelle fonction qui contacte l'IA
        getBotResponse(); 
    });

    // --- FONCTIONS ---
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function getBotResponse() {
    const loadingMessageId = `loading-${Date.now()}`;
    addMessage("...", 'bot', loadingMessageId);

    const requestBody = {
        "contents": conversationHistory,
        "systemInstruction": {
            "parts": [{ "text": SYSTEM_PROMPT }]
        }
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        
        const loadingMessage = document.getElementById(loadingMessageId);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur API:", errorData);
            loadingMessage.textContent = `Désolé, une erreur s'est produite (${errorData.error.message}).`;
            return;
        }

        const data = await response.json();
        const botMessage = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (botMessage) {
            loadingMessage.textContent = botMessage;
            conversationHistory.push({ role: "model", parts: [{ text: botMessage }] });
        } else {
            loadingMessage.textContent = "Oups, je n'ai pas trouvé de réponse. Réessaie !";
        }

    } catch (error) {
        console.error("Erreur de connexion à l'IA:", error);
        const loadingMessage = document.getElementById(loadingMessageId);
        if (loadingMessage) {
            loadingMessage.textContent = "Désolé, je rencontre un problème technique. Réessaie plus tard.";
        }
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