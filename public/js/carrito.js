const host = "http://localhost:8000";
window.addEventListener("load",selectCard,compras(5));

function compras (compraid) {
console.log(compraid);
//al poner el url en el nav no me dirige al carrito mas el producto, solo a el array
    fetch(`${host}/carrito/${compraid}`
    

    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

        const containercompra = document.getElementById("compraid");
        let suma=0;
       
            for(i=0 ; i<json.length ; i++) {
                containercompra.innerHTML +=`  <div>
                <img src="..${json[i].foto}" alt="logo" width="10%" />
          <h4>${json[i].nombre}</h4>
          <h5 class="m-color">${json[i].precio}  <i class="bi bi-cash-coin"></i></h5> 
          <h5>Cantidad : ${json[i].cantidad} </h5>>
          <input type="number" />
            </div>`
             
            suma += json[i].precio * json[i].cantidad;
            }
         suma = parseFloat(suma.toFixed(2));
         const containercaja = document.getElementById("caja");
         containercaja.innerHTML = 
         `<h4>Resumen de su compra</h4>
         <p>Continuar para proceder a la pasarela de pago</p>
         <h3 class="m-color">${suma} <i class="bi bi-cash-coin"></i></h3>
         <a href="pasareladepago.html" class="btn">Proceder al pago</a>`  
            console.log(suma)
    }).catch(function(error) {
        console.log(error)

    })

}

function selectCard() {

    fetch(`${host}/finalizarcompra`,
    
    
    ).then(function(response) {
        return response.json()
    
    }).then (function(json) {
        console.log(json)

        const containertarjeta = document.getElementById("tarjetaselect");
        containertarjeta.innerHTML = `Tarjeta seleccionada :${json}`;

        console.log(containertarjeta);
       

    }).catch(function(error) {
        console.log(error)

    })
     
}
