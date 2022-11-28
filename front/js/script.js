////////////////////////////////////////////////////////////////
// Afficher tous les produits sur la page d'accueil ////////////////////
////////////////////////////////////////////////////////////////

// On récupère l'élément items pour y injecter les produits

const items = document.getElementById("items");
{/* <section class="items" id="items"> 
<!--           <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> -->
        </section> */}
//Appel api
fetch("http://localhost:3000/api/products")
    .then((response) => {
        if (response.ok) {

            response.json()
                .then((products) => {
                    for (let product of products) {
                        // On injecte les infos du produit dans le html
                        // Backend ./models/Products.js
                        items.innerHTML += `<a href="./product.html?id=${product._id}">
                        <article>
                          <img src="${product.imageUrl}" alt="${product.altTxt}">
                          <h3 class="productName">${product.name}</h3>
                          <p class="productDescription">${product.description}</p>
                        </article>
                      </a>`
                      //+= : signification : x = x+y , 
                      //la propriété items.innerHTML récupère la syntaxe HTML décrivant les descendants de l'élément comme <div> puis insère le contenu. 

                    }

                })
                //Méthode catch(), renvoie un objet Promise et ne traique que des cas où la promesse initiale est rejetée.
                .catch((error) => {
                    alert("Le produit n'est pas disponible")
                })
        }

    }).catch((error) => {
    alert("Le serveur ne répond pas")
})


