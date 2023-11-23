const host = "http://localhost:8000";
window.addEventListener("load",compras);

function compras () {


    fetch(`${host}/carrito/${5}`
    

    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

        const containercompra = document.getElementById("compraid");
        containercompra.innerHTML= `<ul>`;

            for(i=0 ; i<json.length ; i++) {
                containercompra.innerHTML +=`<li>${json[i].nombre}${json[i].precio} ${json[i].cantidad}</li>`

            }
            containercompra.innerHTML +=`</ul>`;

    }).catch(function(error) {
        console.log(error)

    })




}