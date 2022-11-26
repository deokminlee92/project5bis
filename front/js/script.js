////////////////////////////////////////////////////////////////
// Afficher tous les produits sur la page d'accueil ////////////////////
////////////////////////////////////////////////////////////////

// On récupère l'élément items pour y injecter les produits
const items = document.getElementById("items");

//Appel api
fetch("http://localhost:3000/api/products")
    .then((response) => {
        if (response.ok) {

            response.json()
                .then((products) => {
                    for (let product of products) {
                        // On injecte les infos du produit dans le html
                        items.innerHTML += `<a href="./product.html?id=${product._id}">
                        <article>
                          <img src="${product.imageUrl}" alt="${product.altTxt}">
                          <h3 class="productName">${product.name}</h3>
                          <p class="productDescription">${product.description}</p>
                        </article>
                      </a>`

                    }

                })
                .catch((error) => {
                    alert("Le produit n'est pas disponible")
                })
        }

    }).catch((error) => {
    alert("Le serveur ne répond pas")
})


