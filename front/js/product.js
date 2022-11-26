/* instruction = statement , séparée par ; */
/* let,var,const : déclaration de variable , nom symbolique*/
/**() => {} function callback*/


// Requète de l'API

fetch('http://localhost:3000/api/products')

    .then(function(reponse) {
        if (reponse.ok) {
        return reponse.json();
        }
    })
/*Paramètre : données */
    .then(function(productInfo) {
        // Récupération de l'ID dans l'url
        let urlcourante = document.location.href;
        let url = new URL(urlcourante);
        // Récupération de l'ID dans l'url
        let id = url.searchParams.get("id");
        let canapePicture = ''

    // Création des variables prix, titre, description, image, altImage
        function donnesVariable () {
        for (let canape of productInfo) {
            if (canape._id == id) {
            prix = canape.price;
            titre = canape.name;
            description = canape.description;
            image = canape.imageUrl;
            altImage = canape.altTxt;

          // Création du lien vers l'image du canapé

            canapePicture += `<img src="${image}" alt="${altImage}">`;

          // Fonction ajout des couleurs dans le menu déroulant des couleurs du canapé
        function addingCanapeColorList() {
            var colorListDropMenu=document.getElementById("colors");
            for (let couleur of canape.colors) {
                var canapeColorList=document.createElement('option');
                canapeColorList.setAttribute("value", couleur);
                canapeColorList.innerHTML=couleur;
                colorListDropMenu.appendChild(canapeColorList);
                    }
                }
                addingCanapeColorList();
            }
        }
    }
    donnesVariable()

    // Fonction injection du nouveau code html dans le DOM
    function InjectionHtmlDom() {
        document.querySelector(".item__img").innerHTML = canapePicture;
        document.querySelector('#title').innerHTML = titre;
        document.querySelector('#price').innerHTML = prix;
        document.querySelector('#description').innerHTML = description;
        }
    
    InjectionHtmlDom();
        
        // Exécution du code au clic sur le bouton "Ajouter au panier"
        document.getElementById("addToCart").onclick = function () {
        // Création des variables pour la quantité de canapés et la couleur choisie
        var checkColor = document.getElementById("colors");
        let selectedColor = checkColor.options[checkColor.selectedIndex].text;
        const selectedQuantity = document.getElementById("quantity").value;

      // Création d'un objet pour injection dans le localStorage clé "canapes"
    let selectedCanapeOption = {
        _id: id,
        couleur: selectedColor,
        quantite: parseInt(selectedQuantity),
        titre,
        description,
        image,
        altImage
    };

      // Local storage
      // stockage de l'id, de la couleur, de la quantité de canapés, du titre, de la description, de l'url de l'image et de l'altImage
      // JSON.parse pour convertir les données au format JSON en objet javascript
    let panierLocalStorage = JSON.parse(localStorage.getItem("canapes"));

      // Message d'erreur si la quantité est inférieure à 1 ou supéreure à 100
    if(selectedQuantity <= 0 || selectedQuantity >= 101) {
        alert("Veuillez entrer une valeur minimum 1 et maximum 100");
        return false;
    }

      // Message d'erreur si la couleur n'est pas sélectionnée
    if(selectedColor == "--SVP, choisissez une couleur --") {
        alert("Veuillez sélectionner une couleur dans ce menu déroulant");
        return false;
    }



      //Fenêtre qui confirme l'ajout des canapés dans le panier et qui permet de se rendre sur la page d'accueil en cliquant sur "Annuler" ou d'aller au panier en cliquant sur "OK"
    const validation = () => {
        if(window.confirm( `canapé: ${titre} couleur: ${selectedColor} quantité: ${selectedQuantity} a bien été ajouté au panier.
        Pour consulter le panier, appuyez sur OK sinon appuyez sur ANNULER pour revenir à l'accueil et continuer vos achats.`)){
            window.location.href = "cart.html";
        }else{
            window.location.href = "index.html";
        }
    }

    // Si aucun produit n'est présent dans localstorage
    if (panierLocalStorage == null) {
        panierLocalStorage = [];
        panierLocalStorage.push(selectedCanapeOption);
        localStorage.setItem("canapes", JSON.stringify(panierLocalStorage));
        validation()
    }
        // Si des produits sont déjà présents dans localstorage
        else if (panierLocalStorage != null) {
            for (i = 0; i < panierLocalStorage.length; i++) {
                // Si des canapés ayant le même id et la même couleur sont déjà présent dans le localStorage
                if (panierLocalStorage[i]._id == id && panierLocalStorage[i].couleur == selectedColor) {
                    return(
                        panierLocalStorage[i].quantite = parseInt(selectedQuantity) + parseInt(panierLocalStorage[i].quantite),
                        localStorage.setItem("canapes", JSON.stringify(panierLocalStorage)),
                        validation()
                        )
                    }
                }
            // Si des canapés ayant le même id ou la même couleur ne sont pas présents dans le localStorage
            for (i = 0; i < panierLocalStorage.length; i++) {
                //|| : une condition sur 2 est ok,  si id dans LS n'est pas de même couleur que le produit choisi//
                if (panierLocalStorage[i]._id != id || panierLocalStorage[i].couleur != selectedColor) {
                    return(
                        panierLocalStorage.push(selectedCanapeOption),
                        localStorage.setItem("canapes", JSON.stringify(panierLocalStorage)),
                        validation()
                        )
                    }
                }  
        }
    }
})
    .catch(err => console.log("Erreur : " + err));

// 로컬스토리지에 이미 존재하는 같은 아이템의 수량이 새로 추가 되는 같은 아이템의 수량의 합이 100이 넘을 경우, return 값을 alert null
