            ////////////////////////////////////////////////////////////////
            /////////////////////// Début Requête API //////////////////////
            ////////////////////////////////////////////////////////////////
fetch('http://localhost:3000/api/products/')
    .then(function (reponse) {
        if (reponse.ok) {
            return reponse.json();
        }
    }).catch(err => console.log(err))

    .then(function (productInfo) {
        // Exécution du code si le localStorage n'est pas vide
        if (localStorage.getItem("canapes") != null) {
            // Récupération du tableau créé dans product.html
            let produitDansLocalStorage = JSON.parse(localStorage.getItem("canapes"));

                        ////////////////////////////////////////////////////////////////
            /////////////////////// Fin Requête API //////////////////////
            ////////////////////////////////////////////////////////////////



            

            //***************************Affichage du prix du canapé ***************************//


            // Création du code html sous l'ID items pour afficher les canapés
            // Déclaration globale des variables 
            let canapeList = '';
            let canape = '';
            let totalProductPrice = [];
                // instruction for of permet de créer une boucle array qui parcourt un objet itérable et d'exécuter des instructions pour la valeur de chaque propriété
                // on fait parcourir dans le tableau produitDansLocalStorage puis chaque élément on va injecter la description du produit
                for (canape of produitDansLocalStorage) {
                    canapeList += `<article class="cart__item" data-id="${canape._id}" data-color="${canape.couleur}">`;
                    canapeList += '<div class="cart__item__img">';
                    canapeList += `<img src="${canape.image}" alt="${canape.altImage}">`;
                    canapeList += '</div>';
                    canapeList += '<div class="cart__item__content">';
                    canapeList += '<div class="cart__item__content__description">';
                    canapeList += `<h2>${canape.titre}</h2>`;
                    canapeList += `<p>${canape.couleur}</p>`;

                //Affichage du prix 
                // on crée un function pour afficher le prix du produit //
                function affichagePriceCanape() {
                    // Déclarer une variable avec sans valeur
                    let priceCanapeEach = '';
                    // Recherche du prix du canapé avec une boucle forte dans le tableau productInfo//
                    for (i = 0; i < productInfo.length; i++) {
                        // Recherche le même produit id  //
                        if (productInfo[i]._id === canape._id) {
                            //Créer une variable pour injecter le prix du canape correspondant//
                            let costCanape = productInfo[i].price;
                            //on remplace le code HTML en injectant le prix//
                            canapeList += `<p>${costCanape.toFixed(2)}€</p>`
                            // Calcul du prix total en faisant le produit de la quantité par le prix//
                            //parseInt= transformer une chaîne de caractère en chiffre//
                            priceCanapeEach = parseInt(productInfo[i].price) * parseInt(canape.quantite);
                            totalProductPrice.push(priceCanapeEach);
                        }
                    }
                }
                affichagePriceCanape()


                //Affichage du prix total//
                // Calcul de la somme des valeurs présentes dans le tableau "prixTotal" et injection du résultat dans le DOM
                function totalPriceCanape() {
                    //méthode Reduce : calculer le prix cumulée
                    //accumulator : prix cumulé , currentValue : nouveau prix ajouté
                    //reduce = méthode, prix total cumulé de tous les produits ajouté, parameter : accumulatedTotalPRice //
                    const reducer = (accumulator, currentValue) => accumulator + currentValue;
                    let getAccumulatedTotalPrice = totalProductPrice.reduce(reducer);
                    // injection du prix //
                    document.querySelector('#totalPrice').innerHTML = getAccumulatedTotalPrice;
                }
                totalPriceCanape()


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
            for (i = 0; i < produitDansLocalStorage.length; i++) {
                _id = produitDansLocalStorage[i]._id;
                // on ajoute _id = productInfo[i]._id dans le tableau
                produits.push(_id);
            }
            // transformer en chaîne de caractère pour le rendre exploitable//
            localStorage.setItem("produits", JSON.stringify(produits));




            //***************************Création du btn Supprimer***************************//



            function deleteProductDansPanier() {
                //Créer un tableau vide 
                let creatArrayMultiProducts = [];
                //Récupère les class=deleteItem avec une variable
                let getAllDeleteBtn = document.querySelectorAll(".deleteItem");

                //Utiliser une méthode, foreach() : permet d'exécuter une fonction donnée sur chaque élément du tableau //
                //la méthode va fonctionner avec une fonction suivante : 
                getAllDeleteBtn.forEach((callbackDelete) => {
                    // Créer un énélèvement "click" //
                    callbackDelete.addEventListener("click", () => {
                        //.closest : méthode , recherche les parents plus proches //
                        let findProductToDeleteUnderArticle = callbackDelete.closest("article");
                        //Créer una variable "savedProductinLocalStorage"  pour le tableau produitDansLocalStorage//
                        let savedProductinLocalStorage = produitDansLocalStorage.length;
                        //Si la quantité du produit dans le Panier n'est pas vide, on supprime le produit du Panier //
                        if (savedProductinLocalStorage == 1) {
                            //removeItem() : méthode, méthode de l'interface Storage, on lui passe une clé en argument, la méthode va supprimer la ressource avec le nom de clé correspondant du storage.//
                            return (localStorage.removeItem("canapes")),
                                //méthode, recharge la ressource depuis l'URL actuelle//
                                location.reload()
                        }
                        // filter() : méthode, crée et retourne un nouveau tableau contenant ts les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback
                        // callback : callbackCanape
                        // si plusieurs produits sont présents dans le panier, on utilise la méthode filter(),
                        else {
                            creatArrayMultiProducts = produitDansLocalStorage.filter((callbackCanape) => {
                                //data- : attribut data- forme une classe d'attribut de données, ça permet d'échanger des données propriétaire entre le HTML et la représentation du DOM//
                                //dataset : propriété en lecture seule rattachée à l'interface HTML fournit un accès en lecture/écrirture aux attributs data- de l'élement. //
                                // utilisation : dataset.propriete , ex) dataset.id
                                //Si l'élément à supprimer ne correspondant pas à _id ou
                                if (findProductToDeleteUnderArticle.dataset.id != callbackCanape._id || findProductToDeleteUnderArticle.dataset.color != callbackCanape.couleur) {
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
            //utiliser forEach() pour exécuter une fonction données sur chaque élément du tableau//
            //callback : Une fonction de rappel est une fonction passée 
            //dans une autre fonction en tant qu'argument, qui est ensuite invoquée à l'intérieur 
            //de la fonction externe pour accomplir une sorte de routine ou d'action.
            // callback: 함수에 파라미터로 들어가는 함수로 순차적으로 실행하고 싶을 때 사용
            zeroQuantity.forEach((callbackZeroQuantity) => {
                // () 는 콜백함수임
                callbackZeroQuantity.addEventListener("change", () => {
                    //Déclarer une variable pour exécuter une recherche la balise parent <article>
                    let rechercheIdToModify = callbackZeroQuantity.closest("article");
                    //créer une varible pour calculer un nombre de type de canapées présents dans le tableau produitDansLocalStorage //
                    let savedProductNumber = produitDansLocalStorage.length;
                    //Si la valeur saisie est 0 et qu'un seul type de canapé est présent dans LS
                    if (callbackZeroQuantity.value == 0 && savedProductNumber == 1) {
                        //supression de la clé "canapé" du LS///Users/deokminlee/Desktop/Visual Studio Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html
                        return (localStorage.removeItem("canapes")),
                            location.reload()
                    }
                    //si la valeur saisie est 0 mais plusieurs types de canapés sont présents dans LS
                    else if (callbackZeroQuantity.value == 0 && savedProductNumber > 1) {
                        // Création d'un filtre "cana" pour récupérer les canapés dont l'id ou la couleur sont différents du type 
                        creatArrayMultiProducts = produitDansLocalStorage.filter((cana) => {
                            if (rechercheIdToModify.dataset.id != cana._id || rechercheIdToModify.color != cana.couleur) {
                                return true;
                            }
                        });
                        localStorage.setItem("canapes", JSON.stringify(creatArrayMultiProducts));
                        location.reload();
                    }
                    // Modifier la quantité dans la case saisie//
                    // si la quantité est supérieure à 0, 
                    else if (callbackZeroQuantity.value > 0) {
                        for (i = 0; i < produitDansLocalStorage.length; i++) {
                            //s'il s'agit d'un canapé du même id + du même canapé de même couleur,
                            if (rechercheIdToModify.dataset.id == produitDansLocalStorage[i]._id && rechercheIdToModify.dataset.color == produitDansLocalStorage[i].couleur) {
                                // on converti en nombre la valeur de la quantité du canapé  
                                produitDansLocalStorage[i].quantite = parseInt(callbackZeroQuantity.value);
                                if (produitDansLocalStorage[i].quantite <= 0 || produitDansLocalStorage[i].quantite >= 101) {
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
            for (i = 0; i < produitDansLocalStorage.length; i++) {
                //on crée une variable pour la quantité du canapé dans LS
                let totalNumberCanape = produitDansLocalStorage[i].quantite;
                //on envoie la quantité total dans LS
                totalArticlePresent.push(totalNumberCanape);
                // console.log(totalArticlePresent, "a");

            }
            // Méhotde reducer : applique une fonction qui est un accumulateur qui traite chaque valeur d'une liste afin de la réduire à une seule valeur
            // on additionne tous les prix existant dans LS
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const totalCanapes = totalArticlePresent.reduce(reducer);
            document.querySelector('#totalQuantity').innerHTML = totalCanapes;

        }

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
            //méthode, si l'évènement n'est pas explicitement géré, l'action par défaut ne devrait pas être exécuté comme elle l'est 
            e.preventDefault();

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
                return /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,40}$/.test(value);
            };

            // Création d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire
            // utiliser class pour créer des objets ayants propriétés
            class Form {
                constructor() {
                    this.firstName = first_name.value;
                    this.lastName = last_name.value;
                    this.address = address.value;
                    this.city = city.value;
                    this.email = e_mail.value;
                }
            } 

            //Appel de l'instance de classe Formulaire pour créer l'objet instanceFormulaire
            //Une méthode d'instance est une fonction faisant partie d'une classe, et qui agit sur une instance de cette classe
            const instanceFormulaire = new Form();

            //Control de la validité FirstName
            function firstNameControl() {
                let name_input = instanceFormulaire.firstName;
                if (REG_EX_FIRST_LAST_NAME(name_input)) {
                    firstNameErrorMessage.innerHTML = "";
                    return true;
                } else {
                    firstNameErrorMessage.innerHTML =
                        "Le prénom doit contenir entre 2-25 lettres";
                    return false;
                }
            }

            //Control de la validité lastName
            function lastNameControl() {
                let last_name_input = instanceFormulaire.lastName;
                if (REG_EX_FIRST_LAST_NAME(last_name_input)) {
                    lastNameErrorMessage.innerHTML = "";
                    return true;
                } else {
                    lastNameErrorMessage.innerHTML =
                        "Le nom doit contenir entre 2-25 lettres";
                    return false;
                }
            }

            //Control de la validité address
            function addressControl() {
                let address_input = instanceFormulaire.address;
                if (REG_EX_ADDRESS(address_input)) {
                    addressErrorMessage.innerHTML = "";
                    return true;
                } else {
                    addressErrorMessage.innerHTML =
                        "Merci de renseigner votre adresse entre 2-80 lettres";
                    return false;
                }
            }

            //Control de la validité city
            function cityControl() {
                let city_input = instanceFormulaire.city;
                if (REG_EX_CITY(city_input)) {
                    cityErrorMessage.innerHTML = "";
                    return true;
                } else {
                    cityErrorMessage.innerHTML =
                        "Merci de renseigner votre adresse entre 2-80 lettres";
                    return false;
                }
            }

            //Control de la validité email
            function emailControl() {
                let email_input = instanceFormulaire.email;
                if (REG_EX_E_MAIL(email_input)) {
                    emailErrorMessage.innerHTML = "";
                    return true;
                } else {
                    emailErrorMessage.innerHTML =
                        "Merci de renseigner votre adresse entre 2-40 lettres ex)xx@.xx";
                    return false;
                }
            }


            // Vérification si la fonction return vrai ou faux
            let firstname_valid = firstNameControl(),
                lastname_valid = lastNameControl(),
                adress_valid = addressControl(),
                city_valid = cityControl(),
                email_valid = emailControl();
                // s'il y a une erreur , on ne valide pas le formulaire
                if (
                    !firstname_valid ||
                    !lastname_valid ||
                    !adress_valid ||
                    !city_valid ||
                    !email_valid
                ) 
                    {
                    alert("Veuillez remplir les champs de saisir")
                    return null;
                    // si le formularie est validé, on envoie l'article vers le erveur , on crée un array products
                    } else {
                        let products = [];
                        let produitDansLocalStorage = JSON.parse(localStorage.getItem("canapes"));
                        for (let selectedArticle of produitDansLocalStorage) {
                            products.push(selectedArticle._id);
                        }

                // Envoie de l'objet order vers le serveur
                fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contact: instanceFormulaire,
                        products: products,
                    }),
                }).then(async (response) => {
                    try {
                        // await, permet d'attendre la résolution d'une promesse.
                        const POST_ORDER = await response.json();
                        //envoyer une variable .orderId comme indiqué 
                        let orderId = POST_ORDER.orderId;

                        //Clear le LS
                        localStorage.clear();
                        window.location.assign("confirmation.html?id=" + orderId);
                    } catch (e) {
                        console.log(e);
                    }
                });
            }

        })
        // last fermeture
    })
