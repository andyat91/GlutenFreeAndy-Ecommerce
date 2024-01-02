 window.addEventListener("load",loginok());


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
        localStorage.setItem("nombre",json[0].nombre);
        // console.log(json[0].nombre,json[0].apellidos)
        localStorage.setItem("apellidos",json[0].apellidos);

    }).catch(function(error) {
        console.log(error)

    })

    
    if(json.message ===  "logueado") {


        const nombre = localStorage.getItem("nombre"); 
        const apellidos = localStorage.getItem("apellidos"); 


        Toastify({
            text: `¡Bienvenido de nuevo!`,
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


function loginok() {


    const nombre = localStorage.getItem("nombre"); 
    const apellidos = localStorage.getItem("apellidos"); 
    

    if(nombre == null || apellidos == null) {
    
        const spanlogin = document.getElementById("spanlogin");
        spanlogin.innerHTML = `<li id="logout"><a href="/html/login.html">Login</a></li>`;

    } else {

        const spanlogin = document.getElementById("spanlogin");
        spanlogin.innerHTML = `<li id="logout" class="spanlogin">${nombre} ${apellidos}</li>
                                <button class="btn" onclick="logout()">Logout</button>`;

    }
}

function logout() {

    localStorage.removeItem("nombre");
    localStorage.removeItem("apellidos");
    localStorage.removeItem("usuarioid");
    localStorage.removeItem("compraid");
    localStorage.removeItem("direccionenvio");
    localStorage.removeItem("numerotarjeta");
    localStorage.removeItem("tarjeta");
    localStorage.removeItem("preciofinal");
    localStorage.removeItem("cantidad");
    localStorage.removeItem("productoidE");

    Toastify({
        text: "Sesion cerrada correctamente.¡Hasta la próxima!",
        duration: 1500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "top",
        position: "center", 
        stopOnFocus: true, 
        style: {
          background: "var(--resalto)",
          width: "400px", 
          "min-height": "120px",
          opacity: 1, 
        }
      
      }).showToast();

      setTimeout(function(){
        window.location.href ="/html/login.html";
    },1500)

}