const host = "http://localhost:8000";
window.addEventListener("load",compras());

function compras() {


    let compraid = localStorage.getItem("compraid");
    console.log(compraid)

//al poner el url en el nav no me dirige al carrito mas el producto, solo a el array
    fetch(`${host}/carrito/${compraid}`
    

    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

        const containercompra = document.getElementById("compraid");
        let suma=0;
       
            for(i=0 ; i<json.length ; i++) {
                containercompra.innerHTML +=`  <div class="cardcarrito">
                                                <div class="fotoproducto">
                                                    <img src="..${json[i].foto}" alt="logo" width="20%" />
                                                    <div class="productoyprecio">
                                                        <h5>${json[i].nombre}</h5>
                                                        <div class="preciocarrito">
                                                        <h5 class="m-color ">${json[i].precio}  <i class="bi bi-cash-coin"></i></h5> 
                                                        </div>
                                                    </div>
                                                </div>
                                                    <div>
                                                    <div class="cantidadescarrito">
                                                        <button onclick="addProducto(${json[i].id})" class="btn mas" ><b><i class="bi bi-plus-circle"></i></b></button>
                                                        <h5 class="input" id="cantidades">${json[i].cantidades} </h5>
                                                        <button onclick="restar(${json[i].id})" class="btn menos" ><b><i class="bi bi-dash-circle"></i></b></button>
                                                        <button onclick="borrarProducto(${json[i].id})" class="btn delete" ><b><i class="bi bi-trash3"></i></b></button>
                                                        </div>
                                                        
                                                    </div>
                                                </div>`
            
         
            suma += json[i].precio * json[i].cantidades;
            localStorage.setItem("cantidad",suma)
            }
         suma = parseFloat(suma.toFixed(2));
         const containercaja = document.getElementById("caja");
         containercaja.innerHTML =      
                                    
         `                              <h4>Resumen de su compra</h4>
                                        <p>Continuar para proceder a la pasarela de pago</p>
                                        <h3 class="m-color">${suma} <i class="bi bi-cash-coin"></i></h3>
                                        <a href="/html/pasareladepago.html" ><button class=btn onclick="pagoFinal()">Finalizar compra</button></a>`  
            console.log(suma)
        localStorage.setItem("preciofinal",suma);
        
        
    }).catch(function(error) {
        console.log(error)

    })

}
function borrarProducto(productoid) {

    let compraid = localStorage.getItem("compraid");
    console.log(productoid);

    fetch(`http://localhost:8000/eliminarproducto`, {

        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({compraid:compraid, productoid:productoid})
    }).then(function(response) {
        return response.json()

    }).then(function(json) {
        alert (json.message)
        window.location.reload()
    }).catch(function(error) {
        console.log(error)
    })
};
//funcion restar
function restar(productoid) {
    
let compraid = localStorage.getItem("compraid");
let cantidad = 1;   

    fetch(`http://localhost:8000/reducircantidad`, {
        method:"POST",
        headers: {
        "Content-Type":"application/json"
        },
    body: JSON.stringify({compraid:compraid, productoid:productoid , cantidad:cantidad})


    }).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json.message);
        window.location.reload()
    }).then(function(error) {
        console.log(error.message)
    })


}