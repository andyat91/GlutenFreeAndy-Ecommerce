

function suscripcion() {

    let emailsuscripcion = document.getElementById("suscripcion").value;

    fetch(`http://localhost:8000/suscripcion`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({emailsuscripcion:emailsuscripcion})

    }).then(function(response) {
        return response.json()

    }).then(function(json) {
        alert(json.message)

    }).catch(function(error) {
        console.log(error);
    })
}