/* instruction = statement , séparée par ; */
/* let,var,const : déclaration de variable , nom symbolique*/
/**() => {} function callback*/


// Requète de l'API

fetch('http://localhost:3000/api/products')

    .then(function (reponse) {
        if (reponse.ok) {
            return reponse.json();
        }
    })
    /*Paramètre : données */
    .then(function (productInfo) {
        // Récupération de l'ID dans l'url
        // propriété en lecture seule renvoie un objet Location contenant les info sur l'URL et fournit des moyens pour modifier cette URL une autre URL
        let urlcourante = document.location.href;
        // URL(), constructeur renvoie un nouvel objet URL représentant l'URL défini par les paramètres.
        // syntaxe : url = new URL(url, [base])
        let url = new URL(urlcourante);
        // Récupération de l'ID dans l'url
        // Propriété en lecture de l'interface URL retourne un objet URLSearcheParams permettant d'accéder aux arguments décodés de la requûete GET contenue dans URL.
        let id = url.searchParams.get("id");
        let canapePicture = ''



            ////////////////////////////////////////////////////////////////
            // Début d'affichage du produit dans la page produit ////////////////////
            ////////////////////////////////////////////////////////////////



        // Création des variables prix, titre, description, image, altImage
        function donnesVariable() {
            // je déclare une variable "canape" qui correspondent aux produits dans models bankend 
            for (let canape of productInfo) {
                // si le produit existe, je prends les clés ensuite renomment .price / .name  etc
                if (canape._id == id) {
                    prix = canape.price;
                    titre = canape.name;
                    description = canape.description;
                    image = canape.imageUrl;
                    altImage = canape.altTxt;
                    // Création du lien vers l'image du canapé
                    //<!-- <img src="../images/logo.png" alt="Photographie d'un canapé"> -->
                    // pour la photo, j'insèere l'image et altImage dans le code HTML
                    canapePicture += `<img src="${image}" alt="${altImage}">`;

                    // Fonction ajout des couleurs dans le menu déroulant des couleurs du canapé
                    function addingCanapeColorList() {
                        // je recupère le code id du HTML dans une variable colorListDropMenu
                        let colorListDropMenu = document.getElementById("colors");
                        //une boucole forte, je cherche la clé "couleur" dans les articles du produit.js dans backend,
                        for (let couleur of canape.colors) {
                            //je crée une nouvelle ligne "option" avec une variable canapeColorList
                            //Méthode : créer un élément HTML
                            let canapeColorList = document.createElement('option');
                            // je remplace les attibuts d'un élément, je change value du code HTML en couleur
                            canapeColorList.setAttribute("value", couleur);
                            canapeColorList.innerHTML = couleur;
                            // je rajoute des options couleurs en utilisant la méthode appendChild
                            colorListDropMenu.appendChild(canapeColorList);
                        }
                    }
                    addingCanapeColorList();
                }
            }
        }
        donnesVariable()

        // Fonction injection du nouveau code html dans le DOM
        // propriété, on récupère la syntaxe HTML puis insère le HTML 
        function InjectionHtmlDom() {
            document.querySelector(".item__img").innerHTML = canapePicture;
            document.querySelector('#title').innerHTML = titre;
            document.querySelector('#price').innerHTML = prix;
            document.querySelector('#description').innerHTML = description;
        }

        InjectionHtmlDom();

        // Exécution du code au clic sur le bouton "Ajouter au panier"
        // L'évènement "onClick" va functionner avec la fuction suivante ,
        document.getElementById("addToCart").onclick = function () {
            // Création des variables pour la quantité de canapés et la couleur choisie
            let checkColor = document.getElementById("colors");
            // Utiliser une proprieté "HTMLSekectElement.options" pour rendre l'option "colors" 
            // je crée une variable selectedColor qui contient les options couleurs en text
            let selectedColor = checkColor.options[checkColor.selectedIndex].text;
            // je crée une variable selectedQuantity qui récupère la valeur saisie dans la case quantité en nombre
            const selectedQuantity = parseInt(document.getElementById("quantity").value);


            ////////////////////////////////////////////////////////////////
            // Fin d'affichage du produit dans la page produit ////////////////////
            ////////////////////////////////////////////////////////////////





            ////////////////////////////////////////////////////////////////
            // Début de la mise en place du localStorage ////////////////////
            ////////////////////////////////////////////////////////////////


            // stockage de l'id, de la couleur, de la quantité de canapés, du titre, de la description, de l'url de l'image et de l'altImage
            // Je crée une variable "panierLocalStorage", elle contiendra les éléments enregistrés sous la clé "canapes" en chaîne de caractère 
            // Méthode, parse(): anaylise une chaîne de caractère JSON et construit la valuer JavaScript ou l'objet 
            let panierLocalStorage = JSON.parse(localStorage.getItem("canapes"));
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

            // Message d'erreur si la quantité est inférieure à 1 ou supéreure à 100
            if (selectedQuantity <= 0 || selectedQuantity >= 101) {
                alert("Veuillez entrer une valeur minimum 1 et maximum 100");
                return false;
            }

            // Message d'erreur si la couleur n'est pas sélectionnée
            if (selectedColor == "--SVP, choisissez une couleur --") {
                alert("Veuillez sélectionner une couleur dans ce menu déroulant");
                return false;
            }


            // Si le nombre de quantité du nouvel articla + le nombre de quantité de l'article déjà existant dans localStorage est supérieur à 100,
            // je bloque la function
            if (panierLocalStorage != null) {
                // La boucle pour trouver l'objet qui correspond
                for (i = 0; i < panierLocalStorage.length; i++) {
                    // Condition si ça matche
                    if (panierLocalStorage[i]._id == id && panierLocalStorage[i].couleur == selectedColor) {
                        // Condition pour vérifier que la quantité ne dépasse pas 100
                        if (parseInt(panierLocalStorage[i].quantite) + parseInt(selectedQuantity) > 100) {
                            alert("Vous ne pouvez pas commander plus de 100 articles");
                            return false;
                        }
                    }
                }
            }

            //Fenêtre qui confirme l'ajout des canapés dans le panier et qui permet de se rendre sur la page d'accueil en cliquant sur "Annuler" ou d'aller au panier en cliquant sur "OK"
            const validation = () => {
                // Afficher une boîte de dialogue avec un message suivant
                if (window.confirm(`canapé: ${titre} couleur: ${selectedColor} quantité: ${selectedQuantity} a bien été ajouté au panier.
        Pour consulter le panier, appuyez sur OK sinon appuyez sur ANNULER pour revenir à l'accueil et continuer vos achats.`)) {
                    window.location.href = "cart.html";
                } else {
                    window.location.href = "index.html";
                }
            }

            // Si aucun produit n'est présent dans localstorage
            if (panierLocalStorage == null) {
                // S'il n'y pas de porudit présent dans localStorage, je crée un array
                panierLocalStorage = [];
                //Méthode, push(), ajoute les éléments à la fin d'un tableau et retourne la nouvelle taille du tableau
                // ici on ajoute un talbeau des éléments "selectedCanapeOption"
                panierLocalStorage.push(selectedCanapeOption);
                // Méthode, setItem : on crée la clé "canapes" et y ajoute panierLocalStorage en chaîne de caractère
                // Méthode, JSON.stringify(): convertir une valeur JavaScript en chaîne de caractère 
                // 이 단계에서 propriété 들이 "" 따옴표로 감싸진다.
                localStorage.setItem("canapes", JSON.stringify(panierLocalStorage));
                validation()
            }

            // Si des produits sont déjà présents dans localstorage
            // on incrément le même produit+couleur dans le produit déjà existant dans LS
            else if (panierLocalStorage != null) {
                for (i = 0; i < panierLocalStorage.length; i++) {
                    // Si des canapés ayant le même id et la même couleur sont déjà présent dans le localStorage
                    if (panierLocalStorage[i]._id == id && panierLocalStorage[i].couleur == selectedColor) {
                        return (
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
                        return (
                            panierLocalStorage.push(selectedCanapeOption),
                            localStorage.setItem("canapes", JSON.stringify(panierLocalStorage)),
                            validation()
                        )
                    }
                }
            }
        }
    })

                ////////////////////////////////////////////////////////////////
            // Fin de la mise en place du localStorage ////////////////////
            ////////////////////////////////////////////////////////////////
    .catch(err => console.log("Erreur : " + err));

// 로컬스토리지에 이미 존재하는 같은 아이템의 수량이 새로 추가 되는 같은 아이템의 수량의 합이 100이 넘을 경우, return 값을 alert null
