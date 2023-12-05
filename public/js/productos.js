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
                                            <button onclick="addProducto(${json[i].id})" class="btn">Añadir al carrito</button>
                                            <a href="/html/descripcion.html?productoid=${json[i].id}" class="btn" >VER</button></a>
                                            
                                        </div>
                                        </div>  
                                        </div>`
        //    localStorage.setItem("producto",json[i].id)
        //IMPORTANTE: Recibe por string el id del producto y se recoge en el JS
        }
    
        console.log(containerCard)

    }).catch(function(error) {
        console.log(error)
    })
};

function addProducto(productoid) {

let usuarioid = localStorage.getItem("usuarioid");
let cantidad = 1;

//if dentro de añadir al carrito para ver si tiene ya compraid o no.
//AQUI LE DIGO SI EL LOCALSTORAGE DE COMPRAID ESTA VACIO Y ME DEVUELVE NULL METO TODO EL CODIGO DE ABAJO Y SINO (mirar)

 let comprobacion  = localStorage.getItem("compraid");

    if(comprobacion == null) {


  //Fetch metido uno dentro de otro EL QUE DEPENDE DEL OTRO VA DENTRO 
    fetch(`http://localhost:8000/nuevacompra/${usuarioid}`, {
        method:"POST",
        headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({usuarioid:usuarioid})

    }).then(function(response) {
        return response.json()
        

    }).then(function(json) {
       
        //obtiene el id de la compranueva mediante lo que devuelve de MySQL
        
        localStorage.setItem("compraid",json.insertId)
       

        fetch(`http://localhost:8000/compraproducto/${usuarioid}`,  {
            method:"POST",
            headers: {
            "Content-Type":"application/json"
            },
        body: JSON.stringify({usuarioid:usuarioid , compraid:json.insertId , productoid:productoid , cantidad:cantidad})
    
    
        }).then(function(response) {
            return response.json()
    
    
        }).then(function(json) {
            console.log(json)
            alert(json.message)
    
        }).catch(function(error) {
            console.log(error)
    
        });
    }).catch(function(error) {
        console.log(error.message);

    });

    } else {

        let compraid = localStorage.getItem("compraid");

        fetch(`http://localhost:8000/compraproducto/${usuarioid}`,  {
            method:"POST",
            headers: {
            "Content-Type":"application/json"
            },
        body: JSON.stringify({usuarioid:usuarioid , compraid:compraid, productoid:productoid , cantidad:cantidad})
    
    
        }).then(function(response) {
            return response.json()
    
    
        }).then(function(json) {
            console.log(json)
    
        }).catch(function(error) {
            console.log(error)
    
        });















        
    }

};
