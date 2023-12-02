
window.addEventListener("load",selectCard);



function selectCard() {

    const idtarjeta = localStorage.getItem("numerotarjeta");

    fetch(`http://localhost:8000/mostrartarjeta/${idtarjeta} `,
    
    
    ).then(function(response) {
        return response.json()
    
    }).then (function(json) {
        console.log(json)
        localStorage.setItem("tarjeta",json);
        const containertarjeta = document.getElementById("tarjetaselect");
        containertarjeta.innerHTML = `Tarjeta seleccionada :${json}`;

        console.log(containertarjeta);
       

    }).catch(function(error) {
        console.log(error)

    })
     
}

function utilizarDireccion() {

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
    body: JSON.stringify({nombre:nombre , apellidos:apellidos, telefono:telefono, email:email , calle:calle, numero:numero, provincia:provincia , CP:CP ,pais:pais})
    
    
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
            localStorage.removeItem("numerotarjeta");
            localStorage.removeItem("usuarioid");
            localStorage.removeItem("compraid");
            localStorage.removeItem("direccionenvio");
            localStorage.removeItem("tarjeta");
            localStorage.removeItem("preciofinal");
            window.location.href ="/index.html";
            
        } else {
            alert("Compra no realizada");
            window.location.href ="/html/finalizarcompra.html";

        }

    }).catch(function(error) {
        console.log(error.message);
    })

}



