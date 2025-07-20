// auth.js - Gère la connexion et la protection de l'espace artiste

function protegerPage() {
    if (!sessionStorage.getItem('artisteConnecte')) {
        alert("Accès refusé. Veuillez vous connecter.");
        window.location.href = 'connexion-artiste.html';
    }
}

function gererConnexion() {
    const form = document.getElementById('form-connexion');
    if (form) {
        // --- DÉFINITION DE L'ARTISTE ENREGISTRÉ (pour la simulation) ---
        const emailEnregistre = "artiste@nka.com";
        const motDePasseEnregistre = "artafricain123";

        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            // --- On récupère ce que l'utilisateur a tapé ---
            const emailSaisi = document.getElementById('email').value;
            const motDePasseSaisi = document.getElementById('password').value;

            // --- On compare avec nos données enregistrées ---
            if (emailSaisi === emailEnregistre && motDePasseSaisi === motDePasseEnregistre) {
                // Si tout est correct, on crée le "laissez-passer"
                sessionStorage.setItem('artisteConnecte', 'true');
                // Et on redirige vers le tableau de bord
                window.location.href = 'dashboard-artiste.html';
            } else {
                // --- Si les identifiants sont incorrects ---
                alert("Email ou mot de passe incorrect. Veuillez réessayer.");
            }
        });
    }
}

function gererDeconnexion() {
    const logoutLink = document.getElementById('lien-deconnexion');
    if (logoutLink) {
        logoutLink.addEventListener('click', function() {
            sessionStorage.removeItem('artisteConnecte');
        });
    }
}

// On exécute les fonctions au chargement du script
gererConnexion();
gererDeconnexion();