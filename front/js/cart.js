//Requête API//
fetch('http://localhost:3000/api/products/')
    .then(function(reponse) {
        if (reponse.ok) {
        return reponse.json();
        }
    })

    .then(function(productInfo){
        // Exécution du code si le localStorage n'est pas vide
        if (localStorage.getItem("canapes") != null) {
        // Récupération du tableau créé dans product.html
            let produitDansLocalStorage = JSON.parse(localStorage.getItem("canapes"));





//***************************Affichage du prix du canapé ***************************//




    // Création du code html sous l'ID items pour afficher les canapés
    // Déclaration des variables
    let canapeList = '';
    let canape = '';
    let totalProductPrice = [];

    for(canape of produitDansLocalStorage){       
        canapeList += `<article class="cart__item" data-id="${canape._id}" data-color="${canape.couleur}">`;
        canapeList += '<div class="cart__item__img">';
        canapeList += `<img src="${canape.image}" alt="${canape.altImage}">`;
        canapeList += '</div>';
        canapeList += '<div class="cart__item__content">';
        canapeList += '<div class="cart__item__content__description">';
        canapeList += `<h2>${canape.titre}</h2>`;
        canapeList += `<p>${canape.couleur}</p>`;        


    // Créer une variable pour créer un tableau vide // 
    function affichagePriceCanape (){
        // Déclarer une variable 
        let priceCanapeEach = '';
            // Recherche du prix du canapé dans l'API//
            for( i = 0; i < productInfo.length; i++){
            // Recherche le même produit id dans //
            if(productInfo[i]._id === canape._id){
                //Créer une variable pour injecter le prix du canape correspondant//
                costCanape = productInfo[i].price;
                //Créer une variable pour injecter le prix//
                canapeList += `<p>${costCanape.toFixed(2)}€</p>`
                // Calcul du prix total en faisant le produit de la quantité par le prix//
                //parseInt= transformer unechaîne de caractère en chiffre//
                priceCanapeEach = parseInt(productInfo[i].price) * parseInt(canape.quantite);
                totalProductPrice.push(priceCanapeEach);
                    }
                }
            }
        affichagePriceCanape ()

        // Calcul de la somme des valeurs présentes dans le tableau "prixTotal" et injection du résultat dans le DOM
    function totalPriceCanape (){
        //Aller chercher les prix dans le panier//
        //méthode Reduce : calculer le prix cumulée
        //accumulator : prix cumulé , currentValue : nouveau prix ajouté
        const reducer = (accumulator , currentValue) =>  accumulator + currentValue ;
        //reduce = méthode, prix total cumulé de tous les produits ajouté, parameter : accumulatedTotalPRice //
        let getAccumulatedTotalPrice = totalProductPrice.reduce(reducer);
        // injection du prix //
        document.querySelector('#totalPrice').innerHTML = getAccumulatedTotalPrice;
    }
        totalPriceCanape ()


        canapeList += '</div>';
        canapeList += '<div class="cart__item__content__settings"></div>';
        canapeList += '<div class="cart__item__content__settings__quantity">';
        canapeList += '<p>Qté : </p>';
        canapeList += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canape.quantite}">`;
        canapeList += '</div>';
        canapeList += '<div class="cart__item__content__settings__delete">';
        canapeList += '<p class="deleteItem">Supprimer</p>';
        canapeList += '</div>';
        canapeList += '</div>';
        canapeList += '</div>';
        canapeList += '</article>';
        }

    // Injection du nouveau code html dans le DOM
    document.querySelector('#cart__items').innerHTML = canapeList;





    //---------------------------Fin l'affichage des produit panier-----------------------------------//


    // Création d'un tableau products contenant les id des produits dans le panier pour effectuer la requête POST sur l’API 
    let produits = [];
    for ( i = 0; i < produitDansLocalStorage.length; i++){
        _id = produitDansLocalStorage[i]._id;
        // on ajoute _id = productInfo[i]._id dans le tableau
        produits.push(_id);
    }
    // transformer en chaîne de caractère pour le rendre exploitable//
    localStorage.setItem("produits", JSON.stringify(produits));




    //***************************Création du btn Supprimer***************************//



    function deleteProductDansPanier (){
        let creatArrayMultiProducts = [];
        
        let getAllDeleteBtn = document.querySelectorAll(".deleteItem");

        //callback "supprim"//
        getAllDeleteBtn.forEach((callbackDelete) =>
                {
                    callbackDelete.addEventListener("click", ()=>
                    {
                        //.closest : méthode , recherche les parents plus proches // 
                        let findProductToDeleteUnderArticle = callbackDelete.closest("article");
                        //Renommer les produits dans LS "savedProductinLocalStorage"//
                        let savedProductinLocalStorage = produitDansLocalStorage.length;
                        //Si la quantité du produit dans le Panier est 1, on supprime le produit du Panier // 
                        if(savedProductinLocalStorage == 1) {
                            //removeItem() : méthode, méthode de l'interface Storage, on lui passe une clé en argument, la méthode va supprimer la ressource avec le nom de clé correspondant du storage.//
                            return(localStorage.removeItem("canapes")),
                            //méthode, recharge la ressource depuis l'URL actuelle//
                            location.reload()
                        }
                            // filter() : méthode, crée et retourne un nouveau tableau contenant ts les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback
                            // callback : callbackCanape
                            // si plusieurs produits sont présents dans le panier, on utilise la méthode filter(),
                            else{creatArrayMultiProducts = produitDansLocalStorage.filter((callbackCanape) =>
                                {
                                    //data- : attribut data- forme une classe d'attribut de données, ça permet d'échanger des données propriétaire entre le HTML et la représentation du DOM//
                                    //dataset : propriété en lecture seule rattachée à l'interface HTML fournit un accès en lecture/écrirture aux attributs data- de l'élement. //
                                    // utilisation : dataset.propriete , ex) dataset.id  
                                    //Si l'élément à supprimer ne correspondant pas à _id ou 
                                    if(findProductToDeleteUnderArticle.dataset.id != callbackCanape._id  || findProductToDeleteUnderArticle.dataset.color != callbackCanape.couleur){
                                        return true
                                    }
                                });
                                localStorage.setItem("canapes", JSON.stringify(creatArrayMultiProducts));
                                location.reload()
                            }
                    })
                })
            }
            deleteProductDansPanier()

    
    //---------------------------------Fin du btn Supprimer-----------------------------------//







    //---------------------------------Manipuler la quantité-----------------------------------//


        // possibilite : Saisir 0 dans la quantité
        // méthode, Créer une variable qui retournera les éléments trouvés correspondant à ".itemQuantity"//
        let zeroQuantity = document.querySelectorAll(".itemQuantity");
        //utiliser forEach() pour exécuter une fonction ddonnée sur chaque élément du tableau//
        zeroQuantity.forEach((callbackZeroQuantity) => 
        {
            callbackZeroQuantity.addEventListener("change", () =>
            {
                //Déclarer une variable pour exécuter une recherche la balise parent <article>
                let rechercheIdToDelete = callbackZeroQuantity.closest("article");
                //créer une varible pour calculer un nombre de type de canapées présents dans le tableau produitDansLocalStorage //  
                let savedProductNumber = produitDansLocalStorage.length;
                //Si la valeur saisis est 0 et qu'un seul type de canapé est présent dans LS
                if(zeroQuantity.value == 0 && savedProductNumber == 1){
                    //supression de la clé "canapé" du LS//
                    return(localStorage.removeItem("canapes")),
                    location.reload()
                }
                //si la valeur saisie est 0 mais plusieurs types de canapés sont présents dans LS
                else if(zeroQuantity.value == 0 && savedProductNumber > 1) {
                    creatArrayMultiProducts = produits.filter((cana) =>
                    {
                        if(rechercheIdToDelete.dataset.id != cana._id || rechercheIdToDelete.color != cana.couleur){
                            return true;
                        }
                    });
                    localStorage.setItem("canapes", JSON.stringify(creatArrayMultiProducts));
                    location.reload();
                }
                // Modifier la quantité dans la case saisie//
                else if(callbackZeroQuantity.value > 0 ){
                    for(i = 0; i < produitDansLocalStorage.length; i++ ){
                        if(rechercheIdToDelete.dataset.id == produitDansLocalStorage[i]._id && rechercheIdToDelete.dataset.color == produitDansLocalStorage[i].couleur){
                            produitDansLocalStorage.quantite = parseInt(callbackZeroQuantity.value);
                                if(produitDansLocalStorage[i].quantite <= 0  || produitDansLocalStorage[i].quantite < 100) {
                                    alert("Veuillez entrer une valeur entre 1 et 100");
                                    return false;
                                }
                                    localStorage.setItem("canapes", JSON.stringify(produitDansLocalStorage));
                                    location.reload();
                        }
                    }
                }
            });
        });

        //calcul de la quantité totale d'articles présents dans le panier
        let totalArticlePresent = [];
        for(i=0; i < produitDansLocalStorage.length; i++){
            let totalNumberCanape = produitDansLocalStorage[i].quantite;
            totalArticlePresent.push(totalNumberCanape);

        }
    
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalCanapes = totalArticlePresent.reduce(reducer);
        document.querySelector('#totalQuantity').innerHTML = totalCanapes;

    }

    // il faut modifier la fonction modification car elle ne fonctionne pas correctement//
    //---------------------------------Fin quantité-----------------------------------//






    //***************************Formulaire de commande***************************//

    //1. on déclare les données du formulaire dans un objet//
    // dans ce formulaire, virgule ,, résultat = l'objet est bien dans la variable // 
    let first_name = document.querySelector("#firstName");
    let last_name = document.querySelector("#lastName");
    let address = document.querySelector("#address");
    let city = document.querySelector("#city");
    let e_mail = document.querySelector("#email");
    let btn_order = document.querySelector("#order")

    // Déclarer des varaibles de message d'erreur + ajouter de la couleur du texte // 
    let firstNameErrorMessage = document.getElementById("firstNameErrorMsg");
        firstNameErrorMessage.style.color = "red";
    let lastNameErrorMessage = document.getElementById("lastNameErrorMsg");
        lastNameErrorMessage.style.color = "red";
    let addressErrorMessage = document.getElementById("addressErrorMsg");
        addressErrorMessage.style.color = "red";
    let cityErrorMessage = document.getElementById("cityErrorMsg");
        cityErrorMessage.style.color = "red";
    let emailErrorMessage = document.getElementById("emailErrorMsg");
        emailErrorMessage.style.color = "red"



    //Champs demandé pour le POST
    let contact = {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
    };


    //Event au click
    btn_order.addEventListener("click", (e) => {
        e.preventDefault();

        // Création d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire
        class Form {
            constructor(){
                this.firstName = first_name.value;
                this.lastName = last_name.value;
                this.address = address.value;
                this.city = city.value;
                this.email = e_mail.value;
            }
        }

        //Appel de l'instance de classe Formulaire pour créer l'objet FORM_VALUE
        const FORM_VALUE = new Form();

        // Const regEx pour le formulaire
        const REG_EX_FIRST_LAST_NAME = (value) => {
            return /^[a-z A-Zàâäéèêëïîôöùûüç-]{2,25}$/.test(value);
        };
        const REG_EX_CITY = (value) => {
            return /^[0-9 a-z A-Zàâäéèêëïîôöùûüç,/\- ]{2,80}$/.test(value);
        };
        const REG_EX_ADDRESS = (value) => {
            return /^[0-9 a-z A-Zàâäéèêëïîôöùûüç,/\- ]{2,80}$/.test(value);
        };
        const REG_EX_E_MAIL = (value) => {
            return /^[a-z A-Zàâäéèêëïîôöùûüç]{2,40}$/.test(value);
        };

            //Control de la validité FirstName
            function firstNameControl() {
                let name_input = FORM_VALUE.firstName;
                if(REG_EX_FIRST_LAST_NAME(name_input)) {
                    firstNameErrorMessage.innerHTML = "";
                    return true;
                }else {
                    firstNameErrorMessage.innerHTML = 
                    "Le prénom doit contenir entre 2-25 lettres";
                    return false;
                }
            }

            //Control de la validité lastName
            function lastNameControl() {
                let last_name_input = FORM_VALUE.lastName;
                if(REG_EX_FIRST_LAST_NAME(last_name_input)) {
                    lastNameErrorMessage.innerHTML = "";
                    return true;
                }else {
                    lastNameErrorMessage.innerHTML = 
                    "Le nom doit contenir entre 2-25 lettres";
                    return false;
                }
            }

            //Control de la validité address
            function addressControl() {
                let address_input = FORM_VALUE.address;
                if(REG_EX_ADDRESS(address_input)) {
                    addressErrorMessage.innerHTML = "";
                    return true;
                }else {
                    addressErrorMessage.innerHTML = 
                    "Merci de renseigner votre adresse entre 2-80 lettres";
                    return false;
                }
            }

            //Control de la validité city
            function cityControl() {
                let city_input = FORM_VALUE.city;
                if(REG_EX_CITY(city_input)) {
                    cityErrorMessage.innerHTML = "";
                    return true;
                }else {
                    cityErrorMessage.innerHTML = 
                    "Merci de renseigner votre adresse entre 2-80 lettres";
                    return false;
                }
            }

            //Control de la validité email
            function emailControl() {
                let email_input = FORM_VALUE.email;
                if(REG_EX_E_MAIL(email_input)) {
                    emailErrorMessage.innerHTML = "";
                    return true;
                }else {
                    emailErrorMessage.innerHTML = 
                    "Merci de renseigner votre adresse entre 2-40 lettres";
                    return false;
                }
            }


            // Vérification si la fonction return vrai ou faux
            let firstname_valid = firstNameControl(),
                lastname_valid = lastNameControl(),
                adress_valid = addressControl(),
                city_valid = cityControl(),
                email_valid = emailControl();
            if (
                !firstname_valid ||
                !lastname_valid ||
                !adress_valid ||
                !city_valid ||
                !email_valid
            )
            return null;
    })

    // Push uniquement les Id dans le tableau des produits
    let products = [];
        for(let selectedArticle of produitDansLocalStorage) {
            products.push(selectedArticle.id);
        }

    // Envoie de l'objet order vers le serveur
    fetch("http://localhost:3000/api/products/order", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({
            contact : FORM_VALUE,
            products : products,
        }),
    }).then(async (response) => {
        try {
            const POST_ORDER = await response.json();
            let orderId = POST_ORDER.orderId;

            //Clear le LS
            localStorage.clear();
            window.location.assign("confirmation.html?id=" +orderId);
        } catch(e) {
            console.log(e);
        }
    });

// last fermeture
})














// // 2. Contrôle de la validité  //

//     // Prénom // 

//     // addEventListner type:input , function(défault "e") //  
//     // type input est déclenché de façon synchrone quand la valeur d'un élément input est modifiée.
//     firstName.addEventListener("input", function(e) {
//         firstNameValue;
//         // s'il n'y a pas de valeur dans input firstName, on rend le résultat null//
//         // target , c'est une référence à l'objet qui a envoyé l'événement. e.target se réfère à l'élément input cliqué, il se déclenchera pour chaque input firstname clické//
//         if(e.target.value.length === 0) {
//             firstNameValue = null;
//             return false;
//             // console.log(firstNameValue);
//             // console.log("firstNameValue")
//             //si le nombre de lettre est inférieur à 2 et supérieur à 20, on envoie le message d'erreur//
//             } else if (e.target.value.length < 2 || e.target.value.length > 25){
//                 firstNameErrorMessage.innerHTML = `entre 2-25`
//                 firstNameValue = null;
//                 return false;
//             }
//                 //Match : méthode, permet d'obtenir le tableau des correspondances entre la chaine courante et une expression rationnelle(regex)//
//                 //si la valeur saisie corresponde à la restriction Regex, ok on accepte,
//                 if(e.target.value.match(regexFirstLastName)){
//                     //on envoie la valeur saisie// 
//                     firstNameValue = e.target.value;
//                     firstNameErrorMessage.innerHTML = "";
//                     return true;
//                     // console.log("ok");
//                     // console.log("firstNameValue");
//                 }
        
//     });

//     // Nom // 

//     // addEventListner type:input , function(défault "e") // 
//     lastName.addEventListener("input", function(e){
//         lastNameValue;
//         if(e.target.value.length ===0) {
//             lastNameValue = null;
//             return false;
//             // console.log(lastNameValue);
//             // console.log("lastNameValue");
//         } else if (e.target.value.length < 2 || e.target.value.length > 20){
//             lastNameErrorMessage.innerHTML = `entre 2-20`;
//             lastNameValue = null;
//             return false;

//         } 
//             if(e.target.value.match(regexFirstLastName)){
//                 lastNameValue = e.target.value;
//                 lastNameErrorMessage.innerHTML = "";
//                 return true;
//                 // console.log("ok");
//                 // console.log("lastNameValue");
//             }

//     });

//     // Adresse // 

//     address.addEventListener("input", function(e){
//         addressValue;
//         if(e.target.value.length === 0 ){
//             addressValue = null;
//             return false;
//             // console.log(addressValue);
//             // console.log("addressValue");
//             }else if(e.target.value.length < 2 || e.target.value.length > 80){
//                 addressErrorMessage.innerHTML = "entre 2-80";
//                 addressValue = null;
//                 return false;
//             }
//                 if(e.target.value.match(regexAddress)){
//                     addressErrorMessage.innerHTML= "";
//                     addressValue = e.target.value;
//                     return true;
//                     // console.log(addressValue);
//                     // console.log("addressValue");
//                 }
            
//     });

//     // Ville //
    
//     city.addEventListener("input", function(e){
//         cityValue;
//         if(e.target.value.length === 0 ){
//             cityValue = null;
//             return false;
//             // console.log(cityValue);
//             // console.log("cityValue");
//         }   else if(e.target.value.length<2  || e.target.value.length > 40){
//             cityErrorMessage.innerHTML = "entre 2-40";
//             cityValue = null;
//             return false;
//         }
//             if(e.target.value.match(regexInfos)){
//                 cityErrorMessage.innerHTML = "";
//                 cityValue = e.target.value;
//                 return true;
//                 // console.log(cityValue);
//                 // console.log("cityValue");
//             }
        
//     });

//         // email //
    
//         email.addEventListener("input", function(e){
//             emailValue;
//             if(e.target.value.length === 0 ){
//                 emailErrorMessage.innerHTML = "Veuillez saisir une adresse email";
//                 emailValue = null;
//                 return false;
//                 // console.log(emailValue);
//                 // console.log("emailValue");
//             }   else if(e.target.value.match(regexEmail)){
//                 emailErrorMessage.innerHTML = "";
//                 emailValue = e.target.value;
//                 return true;
//                 // console.log(emailValue);
//                 // console.log("emailValue");

//             }
//                 if(!e.target.value.match(regexEmail) && !e.target.value.length ===0 ) {
//                     emailErrorMessage.innerHTML = "Veuillez saisir une adresse e-mail (Ex. ads@mail.com";
//                     emailValue = null;
//                     return false;
//                 }
            
//         });

//         addEventListener("sumit", function(e){
//             e.preventDefault();
//             console.log("??");
//         })

//     //---------------------------------Fin Formulaire-----------------------------------//





//     //***************************Debut Envoi vers le Serveur***************************//

// // Créer l'envoi des info au click sur le bouton "Commander"
// let clickBtnCommander = document.getElementById("order");

// // Créer l'évènement "click"

// clickBtnCommander.addEventListener("click", (e) => {
//     e.preventDefault();
//     let firstNameCommander = document.getElementById("firstName").value;
//     let lastNameCommander = document.getElementById("lastName").value;
//     let addressCommander = document.getElementById("address").value;
//     let cityCommander = document.getElementById("city").value;
//     let emailCommander = document.getElementById("email").value;

//     if (
//         !firstNameCommander ||
//         !lastNameCommander ||
//         !addressCommander ||
//         !cityCommander ||
//         !emailCommander
//     )
//         alert("Erreur détectée");
//         return null;

//     })


//     const promise01 = fetch("http://localhost:3000/api/products/order", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(_id),
//             });
//             // console.log("promise01");
//             // console.log(promise01);

//     //Pour voir le résultat
//     promise01.then(async(response) => {
//         try{
//             // console.log("response");
//             // console.log(response);
//             const contenu = await response.json();
//             // console.log("contenu");
//             // console.log(contenu);

//         }catch(e){
//             console.log(e);
//         }
//     })

//     //pour voir ce qu'il y a réellement sur le serveur
//     const promise02 = fetch("http://localhost:3000/api/products/order")
//     promise02.then(async (response) =>{
//         try{
//             // console.log("promise02");
//             // console.log(promise02);
//             const donneeSurServeur = await response.json()
//             // console.log("donneeSurServeur");
//             // console.log(donneeSurServeur);

//         } catch(e){
//             console.log(e);
//         }
//     }) 


    //--------------------------------Fin Serveur-----------------------------------//  

// // last fermeture
// })




/* -----------------------개념정리=--------------------------
//element.closet() : permettre de cibler le produit que vs souhaitez supprimer où dont vs souhaitez modifier la quantité 
//grâce à son identifiant et sa couleur//

//forEach() : méthode, permet d'exécuter une fonction donnée sur chaque élément du tableau//
//syntaxe : arr.forEach(callback); 
//syntaxe : arr.forEach(callback, thisArg);

*/
//element.addEventListener(event, handler); /





// page produit , panier , mettre en oeuvre quantité +100 
// modification quantité , +100 à bloquer
// regex,,, même si le fourmulaire est rempli,  si je n'ai pas de produit, bloquer la commande //
// message d'alerte à faire apparaître , 
// prénom , nom : lettre, espace , - , prénom composé et nom composé 
// adresse : on accepte tt
//  ville : lettre
// email : type @xx.xxx
//  s'il y a une case non remplie, alerte sera envoyé 


// /* expliquer ce que c'est le plan de test , prendre un exemple pour montrer ,
// // pourquoi j'ai codé comme ça ? , pourquoi pas d'autre moyens ?
// // Comment présenter le P5, 
// // rappel du contexte, montrer le site en direct , on montre catalogue, choisir un canap, choisir une couleur sans quantité en fait tt les possibilités ,
// // envoi localstorage également tt les possibilités, (ex, au dessus de 100, )
// // panier ( 2 lignes même canap avec 2 lignes diffé ) 
// // modif, suppression
// // champs de saisies alerte , alerte , si bien fonctionne , tt les possibilités de bloquer 
// // une fois commandé, LS doit être vide
// // plan de test à expliquer : à suivre l'ordre du fichier 
// // Expliquer le code : script : remonter de catalogue , produit : surtout LS, , Panier : tt les functionalités , envoi du formulaire 
// // si je fais PowerPoint : pour le code , à mettre l'accent sur les points 
// / PW :si je le fais;  à mettre des mots clés ++ grands axes à expliquer