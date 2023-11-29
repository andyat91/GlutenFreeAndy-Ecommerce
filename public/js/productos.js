window.addEventListener("load",productosCard);


function productosCard() {

    fetch(`http://localhost:8000/productos`,
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

    const containerCard = document.getElementById("cards");
 
        for(let i=0 ; i<json.length ; i++) {
            containerCard.innerHTML += ` <div class="card">
        
                                            <img src="${json[i].foto}" />
                                            <h4>${json[i].nombre} </h4>
                                            <div class="nombreprecio">
                                                <div>
                                                    
                                                    <h5>${json[i].precio}<i class="bi bi-currency-euro m-color"></i></h5>
                                                </div>
                                        <div class="valoracion">
                                            <span >
                                                <i class="bi bi-star "></i>
                                                <i class="bi bi-star "></i>
                                                <i class="bi bi-star "></i>
                                                <i class="bi bi-star "></i>
                                                <i class="bi bi-star "></i>
                                            </span>
                                        </div>
                                            <p>${json[i].descripcioncorta}</p>
                                        <div>
                                            <button onclick="addProducto(${json[i].id}") class="btn">Añadir al carrito</button>
                                            <a href="descripcion4.html" class="btn" class="ver">VER</a>
                                        </div>
                                        </div>  
                                        </div>`
        }
    
        console.log(containerCard)

    }).catch(function(error) {
        console.log(error)
    })
};