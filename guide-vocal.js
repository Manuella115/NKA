// guide-vocal.js (Version pour le curseur simple)

document.addEventListener('DOMContentLoaded', function () {
    
    // On s'assure que la scène existe
    const scene = document.querySelector('a-scene');
    if (!scene) return;

    if ('speechSynthesis' in window) {
        
        const synth = window.speechSynthesis;
        let utterance = new SpeechSynthesisUtterance();
        utterance.lang = 'fr-FR';
        utterance.rate = 0.9;

        // Message d'accueil mis à jour pour le curseur simple
        scene.addEventListener('loaded', function() {
            setTimeout(() => {
                utterance.text = "Bienvenue dans l'exposition de Beda jean. Pour en savoir plus sur une œuvre, visez-la avec le cercle au centre de l'écran et cliquez.";
                synth.speak(utterance);
            }, 1500);
        });

        // ================================================================
        // LA LOGIQUE QUI FONCTIONNE : On attache un "espion" à chaque oeuvre
        // ================================================================
        const oeuvres = document.querySelectorAll('.oeuvre');
        oeuvres.forEach(oeuvre => {
            
            oeuvre.addEventListener('click', function () {
                const description = this.getAttribute('data-description');
                
                if (description) {
                    synth.cancel();
                    utterance.text = description;
                    synth.speak(utterance);
                }
            });
        });

         const exitButton = document.querySelector('.exit-button-hud');
        if (exitButton) {
            exitButton.addEventListener('click', function() {
                // On coupe la parole immédiatement quand on clique sur le bouton
                synth.cancel();
            });
        }
    } else {
        console.log("Désolé, votre navigateur ne supporte pas le guide vocal.");
    }
    
});