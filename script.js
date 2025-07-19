// script.js (Version avec IA Gemini)

document.addEventListener('DOMContentLoaded', function() {

    // --- CONFIGURATION ---
    const API_KEY = "AIzaSyBOQ_WQyKY5383RfT5tNjKmhVUPKaRf86M"; // ⚠️ Remplace par ta vraie clé API !
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

    const SYSTEM_PROMPT = `Tu es le "Guide NKA", un chatbot expert, amical et passionné pour le site web "NKA". Ta mission est de faire découvrir la créativité africaine de manière amusante et accessible, comme à un ami curieux. Le site NKA a plusieurs sections : Peintures, Musique, Danse traditionnelle, Tourisme, Slam, Masques traditionnels, Sculptures, et Photographie. Il y a aussi une galerie virtuelle 3D pour des expositions immersives. Tes règles sont : 1. Ton ton est toujours positif, encourageant et simple. 2. Réponds aux questions sur le site NKA et sur l'art africain en général. 3. Capacité spéciale : Si un utilisateur te demande des recommandations d'activités, demande-lui dans quel pays il se trouve. Ensuite, propose 2 ou 3 activités artistiques ou culturelles (festivals connus, musées, lieux culturels emblématiques) de ce pays en précisant qu'il est bon de vérifier les dates et horaires en ligne. 4. À la fin de chaque conversation ou si la discussion s'épuise, mentionne l'exposition en cours : "D'ailleurs, n'oublie pas de visiter notre exposition 3D du moment, 'Couleurs d'Afrique' !".`;

    // --- SÉLECTION DES ÉLÉMENTS HTML ---
    const launcher = document.querySelector('.chatbot-launcher');
    const chatWindow = document.querySelector('.chat-window');
    const closeBtn = document.querySelector('.chat-close-btn');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const messagesContainer = document.querySelector('.chat-messages');

    // --- GESTION DE L'HISTORIQUE DE CONVERSATION ---
    let conversationHistory = [];

    // --- ÉVÉNEMENTS ---
    launcher.addEventListener('click', () => chatWindow.classList.toggle('active'));
    closeBtn.addEventListener('click', () => chatWindow.classList.remove('active'));

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        addMessage(userMessage, 'user');
        // Ajoute le message de l'utilisateur à l'historique
        conversationHistory.push({ role: "user", parts: [{ text: userMessage }] });
        
        chatInput.value = '';
        getBotResponse(); // Appelle la fonction pour obtenir la réponse de l'IA
    });

    // --- FONCTIONS PRINCIPALES ---
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // NOUVELLE FONCTION qui interroge l'API Gemini
    async function getBotResponse() {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // On envoie l'instruction système et tout l'historique
                    "systemInstruction": {
                        "parts": [{ "text": SYSTEM_PROMPT }]
                    },
                    "contents": conversationHistory 
                }),
            });

            if (!response.ok) {
                throw new Error(`Erreur API : ${response.statusText}`);
            }

            const data = await response.json();
            // On s'assure que la réponse et le texte existent
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                const botMessage = data.candidates[0].content.parts[0].text;
                addMessage(botMessage, 'bot');
                // Ajoute la réponse du bot à l'historique
                conversationHistory.push({ role: "model", parts: [{ text: botMessage }] });
            } else {
                 addMessage("Oups, je n'ai pas trouvé de réponse. Réessaie !", 'bot');
            }

        } catch (error) {
            console.error("Erreur de connexion à l'IA:", error);
            addMessage("Désolé, je rencontre un problème technique pour me connecter. Réessaie plus tard.", 'bot');
        }
    }
});