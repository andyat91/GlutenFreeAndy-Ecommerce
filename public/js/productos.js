window.addEventListener("load",productosCard);

//Toastify añadir al carrito


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
                                            <div class="paddingcard">
                                            <h4>${json[i].nombre} </h4>
                                            <div class="nombreprecio">
                                                <div>
                                                    
                                                    <h5>${json[i].precio}<i class="bi bi-currency-euro m-color"></i></h5>
                                                </div>
                                        <div class="valoracion">
                                        ${Array.from({ length: json[i].valoracion }, () => '<i class="bi bi-star"></i>').join('')}
                                        </div>
                                            <p>${json[i].descripcioncorta}</p>
                                        <div>
                                            <button onclick="addProducto(${json[i].id})" class="btn">Añadir al carrito</button>
                                            <a href="/html/descripcion.html?productoid=${json[i].id}" class="btn" >VER</button></a>
                                            </div>  
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
    spancarrito();
};

function addProducto(productoid) {

let usuarioid = localStorage.getItem("usuarioid");
let cantidad = 1;

//if dentro de añadir al carrito para ver si tiene ya compraid o no.
//AQUI LE DIGO SI EL LOCALSTORAGE DE COMPRAID ESTA VACIO Y ME DEVUELVE NULL METO TODO EL CODIGO DE ABAJO Y SINO (mirar)

 let comprobacion  = localStorage.getItem("compraid");

    if(comprobacion == null) {



  //Fetch metido uno dentro de otro EL QUE DEPENDE DEL OTRO VA DENTRO 


  //SI  COMPRAID ESTA VACIA INSERTAME UNA LINEA DE COMPRAS------------------------------------------------------------------------------
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
        //    localStorage.setItem("compraproductoid",json.insertId)
        Toastify({
            text: "Producto añadido al carrito!",
            duration: 500,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: false,
            gravity: "top",
            position: "center", 
            stopOnFocus: true,
            style: {
              background: "var(--resalto)",//color var resalto
              width: "200px", 
              "min-height": "80px",
              opacity: 1, 
            }
          
          }).showToast();

        if (urlcarrito.includes("carrito")) {
            setTimeout(function(){
                window.location.reload()
            },1000)
            
        }
    
        }).catch(function(error) {
            console.log(error)
    
        });


    }).catch(function(error) {
        console.log(error.message);

    });

    } else {//y si la compra ya esta creada  tiene que actualizar compraproducto si es el mismo producto y sino crear una nueva compraproducto

         let compraid = localStorage.getItem("compraid");
        console.log(compraid);
        console.log(productoid);
        console.log(usuarioid);
        fetch(`http://localhost:8000/comprobar?compraid=${compraid}&productoid=${productoid}`, 
        
        
        ).then(function(response) {
            return response.json()


        }).then(function(json) {


            if(json.length > 0) {
            
                fetch(`http://localhost:8000/cantidad`, {
                    method:"POST",
                    headers: {
                    "Content-Type":"application/json"
                    },
                body: JSON.stringify({usuarioid:usuarioid , compraid:compraid, productoid:productoid , cantidad:cantidad})


                }).then(function(response) {
                    return response.json()

                }).then(function(json) {
                    
                    Toastify({
                        text: "Producto añadido al carrito!",
                        duration: 500,
                        destination: "https://github.com/apvarun/toastify-js",
                        newWindow: true,
                        close: false,
                        gravity: "top",
                        position: "center", 
                        stopOnFocus: true,
                        style: {
                          background: "var(--resalto)",//color var resalto
                          width: "200px", 
                          "min-height": "80px",
                          opacity: 1, 
                        }
                      
                      }).showToast();

                    spancarrito()
                    let urlcarrito = window.location.href;   
                    if (urlcarrito.includes("carrito")) {

                        setTimeout(function(){
                            window.location.reload()
                        },500)

                        }
                   
                }).catch(function(error) {
                    console.log(error.message)
                })
                

            } else {

                console.log(compraid);
                console.log(productoid);
                fetch(`http://localhost:8000/compraproducto/${usuarioid}`,  {
                    method:"POST",
                    headers: {
                    "Content-Type":"application/json"
                    },
                body: JSON.stringify({usuarioid:usuarioid , compraid:compraid, productoid:productoid , cantidad:cantidad})
            
            
                }).then(function(response) {
                    return response.json()
            
            
                }).then(function(json) {
                    
                    Toastify({
                        text: "Producto añadido al carrito!",
                        duration: 500,
                        destination: "https://github.com/apvarun/toastify-js",
                        newWindow: true,
                        close: false,
                        gravity: "top",
                        position: "center", 
                        stopOnFocus: true,
                        style: {
                          background: "var(--resalto)",//color var resalto
                          width: "200px", 
                          "min-height": "80px",
                          opacity: 1, 
                        }
                      
                      }).showToast();

                    spancarrito()
                    let urlcarrito = window.location.href;
                    if (urlcarrito.includes("carrito")) {

                        setTimeout(function(){
                            window.location.reload()
                        },500)
                        }
                        
                  
                }).catch(function(error) {
                    console.log(error)
            
                });
            }

        }).catch(function(error) {
            console.log(error.message)

        })

   
   };

  //Preguntar en clase el primero no lo hace bien
  
};


function spancarrito() {

    let compraid = localStorage.getItem("compraid");
    fetch(`http://localhost:8000/spancarrito?compraid=${compraid}`
    
    ).then(function(response) {
     return response.json()
 
 
    }).then(function(json) {
     console.log(json[0].span);
        
        if(json[0].span == null) {
            const span = document.getElementById("cantidad");
            span.innerHTML = `0`  
        } else {
         const span = document.getElementById("cantidad");
         span.innerHTML = `${json[0].span}`
        }
      //  window.location.reload()
    }).catch(function(json) {
 
 
    });
 
}

