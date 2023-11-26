const host = "http://localhost:8000";
window.addEventListener("load",selectCard);




function selectCard() {

    fetch(`${host}/finalizarcompra`,
    
    
    ).then(function(response) {
        return response.json()
    
    }).then (function(json) {
        console.log(json)

        const containertarjeta = document.getElementById("tarjetaselect");
        containertarjeta.innerHTML = `${json}`;

        console.log(containertarjeta);
       

    }).catch(function(error) {
        console.log(error)

    })
     
}


