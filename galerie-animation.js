// galerie-animation.js

// On attend que tout le contenu de la page soit chargé
document.addEventListener('DOMContentLoaded', function() {

    // 1. On trouve la galerie sur la page
    const galerie = document.querySelector('.galerie-photos');

    // On s'assure que la galerie existe bien sur cette page avant de continuer
    if (galerie) {

        // 2. On crée une fonction pour mélanger les tableaux
        function melangerLesOeuvres() {
            // On récupère tous les tableaux présents dans la galerie
            const oeuvres = Array.from(galerie.children);

            // On mélange le tableau des oeuvres de manière aléatoire
            oeuvres.sort(() => Math.random() - 0.5);

            // 3. On ré-insère les oeuvres dans la galerie dans le nouvel ordre
            oeuvres.forEach(oeuvre => galerie.appendChild(oeuvre));
        }

        // 4. On lance la fonction de mélange toutes les 3 secondes (3000 millisecondes)
        setInterval(melangerLesOeuvres, 3000);
    }
});