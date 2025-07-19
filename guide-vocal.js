// guide-vocal.js

// Attend que le composant A-Frame soit prêt
document.addEventListener('DOMContentLoaded', function () {
    
    // Vérifie si le navigateur peut utiliser la synthèse vocale
    if ('speechSynthesis' in window) {
        
        const synth = window.speechSynthesis;
        let utterance = new SpeechSynthesisUtterance();
        utterance.lang = 'fr-FR';
        utterance.rate = 0.9;

        // ================================================================
        // NOUVEAU : Message d'accueil automatique
        // ================================================================
        
        // --- Paramètres de l'exposition (tu peux les changer ici) ---
        const titreExpo = "Couleurs d'Afrique";
        const auteurExpo = "la communauté NKA"; // Met le nom que tu veux
        
        const messageAccueil = `Bienvenue dans l'exposition ${titreExpo}, présentée par ${auteurExpo}. Pour en savoir plus sur une œuvre, visez-la avec le curseur et cliquez.`;
        
        // On attend un petit peu pour être sûr que tout est chargé
        setTimeout(() => {
            utterance.text = messageAccueil;
            synth.speak(utterance);
        }, 1000); // 1 seconde de délai

        // Bon à savoir : Certains navigateurs bloquent le son qui démarre tout seul.
        // Comme l'utilisateur a cliqué sur "Entrer" sur la page d'avant, cela devrait fonctionner.


        // ================================================================
        // Logique pour cliquer sur les oeuvres (inchangée)
        // ================================================================

        const oeuvres = document.querySelectorAll('.oeuvre');
        oeuvres.forEach(oeuvre => {
            oeuvre.addEventListener('click', function () {
                const description = this.getAttribute('data-description');
                synth.cancel();
                utterance.text = description;
                synth.speak(utterance);
            });

            oeuvre.addEventListener('mouseenter', function() {
                const cursor = document.querySelector('a-cursor');
                cursor.setAttribute('color', '#FF8117');
            });
            oeuvre.addEventListener('mouseleave', function() {
                const cursor = document.querySelector('a-cursor');
                cursor.setAttribute('color', '#D7322A');
            });
        });

        // ================================================================
        // NOUVEAU : Logique pour la porte de sortie
        // ================================================================

        const porteSortie = document.querySelector('#porte-sortie');
        if (porteSortie) {
            // Quand on clique sur la porte
            porteSortie.addEventListener('click', function() {
                // On annonce la sortie
                synth.cancel();
                utterance.text = "À bientôt !";
                synth.speak(utterance);

                // On attend un peu que la phrase soit dite, puis on change de page
                setTimeout(() => {
                    window.location.href = 'categories.html';
                }, 1000); // Redirection après 1 seconde
            });

            // On change aussi la couleur du curseur sur la porte
            porteSortie.addEventListener('mouseenter', function() {
                const cursor = document.querySelector('a-cursor');
                cursor.setAttribute('color', '#FFFFFF');
            });
            porteSortie.addEventListener('mouseleave', function() {
                const cursor = document.querySelector('a-cursor');
                cursor.setAttribute('color', '#D7322A');
            });
        }


    } else {
        console.log("Désolé, votre navigateur ne supporte pas le guide vocal.");
    }
});