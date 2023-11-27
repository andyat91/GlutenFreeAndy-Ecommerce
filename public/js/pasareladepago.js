
window.addEventListener("load",formadepago());

function formadepago() {

    let usuarioid = 5;


    fetch(`http://localhost:8000/pasareladepago/${usuarioid}`
    
    
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

        const containertarjeta = document.getElementById("mistarjetas");
        containertarjeta.innerHTML = `<ul>`;
        for(i=0 ; i<json.length ; i++) {                                            
            containertarjeta.innerHTML += `<li><button class="btn" onclick="selectCard('${json[i].id}')">${json[i].numerotarjeta}  Seleccionar esta tarjeta</button> </li>`
        }
        containertarjeta.innerHTML+=`</ul>`;
        
    }).catch(function(error) {
        console.log(error)
    })
}

function addCard() {

    let usuarioid = 5;

//falta arreglar idusuario 
    const numerotarjeta = document.getElementById("numerotarjeta").value;
    const titulartarjeta = document.getElementById("titulartarjeta").value;
    const tipotarjeta = document.getElementById("tipotarjeta").value;
    const caducidad = document.getElementById("caducidad").value;
    const CVV = document.getElementById("CVV").value;
   
    //usuarioid 
    


    fetch(`http://localhost:8000/pasareladepago`, {
        method:"POST",
        headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({numerotarjeta:numerotarjeta , titulartarjeta:titulartarjeta, tipotarjeta:tipotarjeta , caducidad:caducidad , CVV:CVV , usuarioid:usuarioid})
    

    }).then(function(response) {
        return response.json()
    
    }).then(function(json) {
        console.log(json)
        alert(json.message);
    
    
    }).catch(function(error) {
        console.log(error)

    })

};
//esta funcion guarda el numero de tarjeta para mostrarlo en la pagina siguiente.

function selectCard(numerotarjeta) {
    console.log(numerotarjeta);
    localStorage.setItem("numerotarjeta",numerotarjeta);

};

