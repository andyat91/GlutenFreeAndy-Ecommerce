
window.addEventListener("load",formadepago());

function formadepago() {

    let usuarioid = localStorage.getItem("usuarioid");


    fetch(`http://localhost:8000/pasareladepago/${usuarioid}`
    
    
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

        const containertarjeta = document.getElementById("mistarjetas");
        containertarjeta.innerHTML = `<ul>`;
        for(i=0 ; i<json.length ; i++) {                                            
            containertarjeta.innerHTML += `<li><button class="tarjeta" onclick="guardarCard('${json[i].id}')"><h5><i class="bi bi-credit-card"></i>${json[i].numerotarjeta} <i class="bi bi-check2-circle check"></i> </h5></button> </li>`
        }
        containertarjeta.innerHTML+=`</ul>`;
        
    }).catch(function(error) {
        console.log(error)
    })
}

function addCard() {

    let usuarioid = localStorage.getItem("usuarioid");

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

        Toastify({
            text: "Tarjeta añadida correctamente",
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: false,
            gravity: "top",
            position: "center", 
            stopOnFocus: true, 
            style: {
              background: "var(--resalto)",
              width: "200px", 
              "min-height": "80px",
              opacity: 1, 
            }
          
          }).showToast();
        
        window.location.reload()
    
    }).catch(function(error) {
        console.log(error)

    })

};
//esta funcion guarda el numero de tarjeta para mostrarlo en la pagina siguiente.

function guardarCard(idtarjeta) {

    localStorage.setItem("numerotarjeta",idtarjeta);
    console.log(idtarjeta)

    Toastify({
        text: "Tarjeta seleccionada",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "top",
        position: "center", 
        stopOnFocus: true, 
        style: {
          background: "var(--resalto)",
          width: "200px", 
          "min-height": "80px",
          opacity: 1, 
        }
      
      }).showToast();
};

