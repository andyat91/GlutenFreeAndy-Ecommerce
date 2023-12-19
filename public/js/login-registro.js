


function iniciarSesion() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(email,password);
;
// Login
fetch(`http://localhost:8000/login`, {
    method:"POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({email: email, password: password})
}).then(function(response) {
    return response.json()

}).then(function (json) {
    console.log(json);
    
    
    fetch(`http://localhost:8000/loginok`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email: email})

    }).then(function(response) {
        return response.json()

    }).then(function(json) {
        const idComoNumero = Number(json[0].id);
        localStorage.setItem("usuarioid",idComoNumero);

    }).catch(function(error) {
        console.log(error)

    })



    
    if(json.message ===  "logueado") {
//json parse

        
        Toastify({
            text: "¡Bienvenido de nuevo!",
            duration: 1000,
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

          setTimeout(function() {
            window.location.href ="/index.html";
          },1000);
       
    } else {

        Toastify({
            text: "Email o contraseña incorrectos",
            duration: 2500,
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
    }
}).catch(function (error) {
    console.log(error)

})

}
function registro() {

    const nombre = document.getElementById("nombreR").value;
    const apellidos = document.getElementById("apellidosR").value;
    const email = document.getElementById("emailR").value;
    const password = document.getElementById("passwordR").value;

    fetch(`http://localhost:8000/registro`,     {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({nombre:nombre,apellidos:apellidos,email: email, password: password})

    }).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

        Toastify({
            text: "¡Registrado con éxito!",
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

        localStorage.setItem("usuarioid",json.insertId);

    }).catch(function(error) {
        console.log(error.message);
    })
}