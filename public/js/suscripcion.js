

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

        Toastify({
            text: "Suscripción realizada",
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

    }).catch(function(error) {
        console.log(error);
    })
}