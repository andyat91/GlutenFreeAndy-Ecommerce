const host = "http://localhost:8000";
window.addEventListener("load",formadepago(5),selectCard);

function formadepago (idusuario) {
    console.log(idusuario);

    fetch(`/pasareladepago/${idusuario}`
    
    
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

        const containertarjeta = document.getElementById("mistarjetas");
        containertarjeta.innerHTML = `<ul>`;
        for(i=0 ; i<json.length ; i++) {                                            //aqui iria ${json[i].numerotarjeta}
            containertarjeta.innerHTML += `<li>${json[i].numerotarjeta} </li>` //<button onclick=selectCard()>Seleccionar esta tarjeta</button> 
        }
        containertarjeta.innerHTML+=`</ul>`;
        
    }).catch(function(error) {
        console.log(error)
    })
}

function addCard() {

//falta arreglar idusuario 
    const numerotarjeta = document.getElementById("numerotarjeta").value;
    const titulartarjeta = document.getElementById("titulartarjeta").value;
    const tipotarjeta = document.getElementById("tipotarjeta").value;
    const caducidad = document.getElementById("caducidad").value;
    const CVV = document.getElementById("CVV").value;
    
console.log(numerotarjeta)

    fetch(`${host}/pasareladepago`, {
        method:"POST",
        headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({numerotarjeta:numerotarjeta , titulartarjeta:titulartarjeta, tipotarjeta:tipotarjeta , caducidad:caducidad , CVV:CVV})
    

    }).then(function(response) {
        return response.json()
    
    }).then(function(json) {
        console.log(json)
        alert("Tarjeta añadida");
    
    
    }).catch(function(error) {
        console.log(error)

    })

};

