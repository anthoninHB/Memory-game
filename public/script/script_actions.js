
//quand on defile sur la page, cette fonction s'execute
window.onscroll = function() {
    var bouton_retour_haut = document.getElementById("bouton_retour_haut");
    scrollFunction()
};

//fonction qui affiche ou non le bouton de retour vers le haut
function scrollFunction() {
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        bouton_retour_haut.style.display = "block";
    }
    else {
        bouton_retour_haut.style.display = "none";
    }
}

//fonction qui permet de retourner en haut de la page 
function to_the_top() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
