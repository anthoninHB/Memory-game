
const divGame = document.querySelector("#game");
const divResultat = document.querySelector("#resultat");
const divConsignes = document.querySelector("#consignes");

var oldSelection = [];
var nbAffiche=0;
var ready = true;
var nbPaire;
var nbPLigne;
var nbPColonne;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tag = urlParams.get('tag');
const choixTaille = parseInt(urlParams.get('taille'),10);
const name = urlParams.get('name');
//On remplit un dictionnaire avec les images liées au tag
setLinksGoogleImage(tag);
//On recupere les parametres entrés lors du choix

var links = new Map();
var tabJeu=jeuBonneTaille(choixTaille);
var compteurDeCoups=0;


var tabResultat = genereTableauAleatoire(choixTaille);
//On prepare le tableau avec les images qui sont de base cachées, les images sont 
//recupérées depuis le dictionnaire initialisé avant
afficherTableau();


function setLinksGoogleImage(tag)
{

    var j =0;
    var index=1;

    for (index=1;index<20;index+=10)

    { $.getJSON( "https://www.googleapis.com/customsearch/v1?key=AIzaSyCpUbZzJWYL6fftZqfJPSwDgOeOsitgpRY&cx=7a0e2b71e4da01ce4&q="+tag+"s&searchType=image&fileType=png&start="+index+"&imgSize=medium&alt=json",
    function (jss) { 
        
        $.each(jss.items, function(i,item){  
            console.log('link numero'+j);
            console.log(item.link);  
            links.set(j,item.link);
            j++;
            //$("body").append("<img src=" + item.link + ">");
         });
       

        });
};
}

function afficherTableau(){
    var txt="";

    //txt += "<div> <h2> Nombre de tentatives :  "+compteurDeCoups+"  </h2> </div>";
    divConsignes.innerHTML="<div id=\"consignes\"> <h3 style=\"font-style:italic;color:green;text-align:center;\">Trouvez toutes les paires !  </h3> </div>";



    for(var i=0; i < tabJeu.length ; i++)
    {
     

        txt += "<div>";

        for (var j=0; j < tabJeu[i].length ; j++)

        {
        

            if (tabJeu[i][j] === 0)
            {
                txt += "<button class='btn btn-primary m-2' style='width:100px;height:80px' onClick='verif(\""+i+"-"+j+"\")' >Afficher</button>";

            }
            else
            {
                txt += "<img src='"+getImage(tabJeu[i][j])+"' style='width:100px;height:80px' class='m-2'>";
            }

        }
        txt += "</div>";
    } 
    divGame.innerHTML=txt;
}

function setLinks(tag)
{
    $(document).ready(function(){

    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    {
        tags: tag,
        tagmode: "any",
        format: "json"
    },
    function(data) {           

        for (let i = 0; i < data.items.length; i++)
        {
            var image_src = data.items[i]['media']['m'].replace("_m", "_b");
            links.set(i,image_src);
    
        }

    });

});

}

 function getImage(valeur)
{
    var imgTxt  ="";
    imgTxt+=links.get(valeur);
    
    return imgTxt;
}
    function verif(bouton)
    {
       
        var txt="";
        if (ready)
        {
        nbAffiche++;
        var ligne = bouton.substr(0,1);
        var colonne = bouton.substr(2,1);
        tabJeu[ligne][colonne] = tabResultat[ligne][colonne];
        console.log("boutton");
        console.log(tabResultat[ligne][colonne]);
        afficherTableau();

        if (nbAffiche>1)
        {
            ready = false;
            setTimeout(() => 
            {

                if(tabJeu[ligne][colonne] != tabResultat[oldSelection[0]][oldSelection[1]])
                {
                    tabJeu[ligne][colonne]=0; 
                    tabJeu[oldSelection[0]][oldSelection[1]]=0; 
                }
                else
                {}
                afficherTableau();
                ready=true;
                nbAffiche=0;

            },2500);

            compteurDeCoups++;
            if (ifOnGoing()==false)
            {
                txt += "<div> <h2> Bravo vous avez réussi en "+compteurDeCoups+" tentatives! </h2> </div>";
                divResultat.innerHTML=txt;
            }

            else
            {
                txt += "<div> <h2> Nombre de tentatives :  "+compteurDeCoups+"  </h2> </div>";
                divResultat.innerHTML=txt;

            }

        }
        else
        {oldSelection=[ligne,colonne];}
        }      
    }

    function genereTableauAleatoire(choixTaille)
    {
        var tab = [];
        switch (choixTaille)
        {
            case 1: var nbImagePosition=[0,0,0,0,0,0,0,0];

                break;
            case 2: var nbImagePosition=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

                break;
            case 3: var nbImagePosition=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

                break;
            default: var nbImagePosition=[0,0,0,0,0,0,0,0];

        }


        for(var i=0 ; i<nbPColonne ; i++)
        {
            var ligne = [];

            for (var j=0 ;  j <  nbPLigne   ; j++)
            {
                var fin = false;
                while (!fin)
                {                
                var randomImage = getRndInteger(0,20);
               

                if (nbImagePosition[randomImage] < 2 )
                {
                    ligne.push(randomImage+1);
                    nbImagePosition[randomImage]++;
                    fin=true;
                }
                }               
            }
            tab.push(ligne);
        }
        return tab;
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }

      function ifOnGoing()

      {
          var onGoing=false;
          for(var i=0 ; i < nbPColonne ; i++)
        {
            for (var j=0 ;  j < nbPLigne ; j++)
            {
                if (tabJeu[i][j]==0)
                { onGoing=true;
                     break;}
            }
        }
        console.log("ongoing est "+onGoing);
        return onGoing;

      }
      function jeuBonneTaille(taille){
    
        switch (choixTaille)
        {
        case 1:
            //16 cartes, 8 dessins différents
            var tabJeu = [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
            ];
            nbPaire=8;
            nbPLigne=4;
            nbPColonne=4;
            
            
            break;
        case 2:
                //30 cartes, 15 dessins différents
            var tabJeu = [
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
            ];
            nbPaire=15;
            nbPLigne=6;
            nbPColonne=5;
            break;
        case 3:
                    //42 cartes, 21 dessins différents
        
            var tabJeu = [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                
            ];
            nbPaire=20;
            nbPLigne=8;
            nbPColonne=5;
            break;
        default: 
        var tabJeu = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        nbPaire=8;
        nbPLigne=4;
        nbPColonne=4;
        }
        return tabJeu;
        }


