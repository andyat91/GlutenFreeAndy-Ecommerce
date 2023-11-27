
window.addEventListener("load",selectCard);



function selectCard() {

    const idtarjeta = localStorage.getItem("numerotarjeta");

    fetch(`http://localhost:8000/mostrartarjeta/${idtarjeta} `,
    
    
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

console.log(nombre,apellidos,telefono,email,calle,numero,provincia,CP,pais);


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


