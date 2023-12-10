
window.addEventListener("load",finalizarCompras(),selectCard());

function finalizarCompras() {


    let compraid = localStorage.getItem("compraid");

//al poner el url en el nav no me dirige al carrito mas el producto, solo a el array
    fetch(`http://localhost:8000/carrito/${compraid}`
    

    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

        const containercompra = document.getElementById("compraidresumen");
        let suma=0;
       
            for(i=0 ; i<json.length ; i++) {
                containercompra.innerHTML +=`  <div class="cardcarrito">
                                                <div class="fotoproducto">
                                                    
                                                    <div>
                                                        <h5>${json[i].nombre}</h5>
                                                        <p class="m-color">Precio: ${json[i].precio}  <i class="bi bi-cash-coin"></i></p> 
                                                        <p >Cantidad : ${json[i].cantidades} </p>
                                                    </div>
                                                </div>
                                                    <div>
                                                        <button onclick="borrarProducto(${json[i].id})" class="btn" ><b><i class="bi bi-trash3"></i></b></button>
                                                    </div>
                                                </div>`
             
            suma += json[i].precio * json[i].cantidades;
            localStorage.setItem("cantidad",suma)
            }
         suma = parseFloat(suma.toFixed(2));
         const containercaja = document.getElementById("cajaresumen");
         containercaja.innerHTML = 
         `                              
                                        <h4>Total</h4>
                                        <h3 class="m-color">${suma} <i class="bi bi-cash-coin"></i></h3>
                                        <button class="btn" onclick="pagoFinal()">Finalizar compra</button>`  
            console.log(suma)
        localStorage.setItem("preciofinal",suma);
    }).catch(function(error) {
        console.log(error)

    })

};

function selectCard() {

    const idtarjeta = localStorage.getItem("numerotarjeta");

    fetch(`http://localhost:8000/mostrartarjeta/${idtarjeta} `,
    
    
    ).then(function(response) {
        return response.json()
    
    }).then (function(json) {
        console.log(json)
        localStorage.setItem("tarjeta",json);
        const containertarjeta = document.getElementById("tarjetaselect");
        containertarjeta.innerHTML = `<h5>${json}<i class="bi bi-check2-circle check"></i></h5>`;

    }).catch(function(error) {
        console.log(error)

    })
     
}

function utilizarDireccion() {

    let usuarioid = localStorage.getItem("usuarioid");
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value; 
    const telefono = document.getElementById("telefono").value; 
    const email = document.getElementById("email").value;  
    const calle = document.getElementById("calle").value; 
    const numero = document.getElementById("numero").value; 
    const provincia = document.getElementById("provincia").value; 
    const CP = document.getElementById("CP").value; 
    const pais = document.getElementById("pais").value;
    let direccionenvio = calle+" "+numero;
    
    localStorage.setItem("direccionenvio",direccionenvio);
console.log(direccionenvio);


    fetch(`http://localhost:8000/finalizarcompra`, {
        method:"POST",
        headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({nombre:nombre , apellidos:apellidos, telefono:telefono, email:email , calle:calle, numero:numero, provincia:provincia , CP:CP ,pais:pais , usuarioid:usuarioid})
    
    
    }).then(function(response) {
        return response.json()
    
    }).then(function(json) {
        console.log(json)
        alert(json.message);
    
    
    }).catch(function(error) {
        console.log(error.message)
    
    })
}
//REALIZAR PAGO REALIZADO CON EXITO Y CAMBIAR EL ESTADO DE COMPRA A 1 funcion en boton que haga un update de compras.estado


function pagoFinal() {

    let compraid = localStorage.getItem("compraid");
    let preciofinal = localStorage.getItem("preciofinal");
    let tarjeta = localStorage.getItem("tarjeta");
    let direccionenvio = localStorage.getItem("direccionenvio");
    


    fetch(`/pagofinal/${compraid}`, {
        method:"POST",
        headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({preciofinal:preciofinal, direccionenvio:direccionenvio, tarjeta:tarjeta})

    }).then(function(response) {
        return response.json()
        


    }).then(function(json) {
        alert(json.message);
        if(json.message == "compra finalizada") {
            localStorage.removeItem("usuarioid");
            localStorage.removeItem("compraid");
            localStorage.removeItem("direccionenvio");
            localStorage.removeItem("numerotarjeta");
            localStorage.removeItem("tarjeta");
            localStorage.removeItem("preciofinal");
            localStorage.removeItem("cantidad");
            localStorage.removeItem("productoidE");
            window.location.href ="/index.html";
            
        } else {
            alert("Compra no realizada");
            window.location.href ="/html/finalizarcompra.html";

        }

    }).catch(function(error) {
        console.log(error.message);
    })

}



