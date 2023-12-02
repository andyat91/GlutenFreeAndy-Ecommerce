const host = "http://localhost:8000";
window.addEventListener("load",compras());

function compras() {


    let compraid = localStorage.getItem("compraid");

//al poner el url en el nav no me dirige al carrito mas el producto, solo a el array
    fetch(`${host}/carrito/${compraid}`
    

    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

        const containercompra = document.getElementById("compraid");
        let suma=0;
       
            for(i=0 ; i<json.length ; i++) {
                containercompra.innerHTML +=`  <div class="card cardcarrito">
                <img src="..${json[i].foto}" alt="logo" width="10%" />
          <h5>${json[i].nombre}</h5>
          <h5 class="m-color">${json[i].precio}  <i class="bi bi-cash-coin"></i></h5> 
          <h5>Cantidad : ${json[i].cantidades} </h5>
          <input type="number" class="cantidadfor" />
            </div>`
             
            suma += json[i].precio * json[i].cantidades;
            localStorage.setItem("cantidad",cantidad);
            }
         suma = parseFloat(suma.toFixed(2));
         const containercaja = document.getElementById("caja");
         containercaja.innerHTML = 
         `<h4>Resumen de su compra</h4>
         <p>Continuar para proceder a la pasarela de pago</p>
         <h3 class="m-color">${suma} <i class="bi bi-cash-coin"></i></h3>
         <a href="/html/pasareladepago.html" ><button class=btn onclick="pagoFinal()">Finalizar compra</button></a>`  
            console.log(suma)
        localStorage.setItem("preciofinal",suma);
    }).catch(function(error) {
        console.log(error)

    })

}

