


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



    alert(json.message);
    if(json.message ===  "logueado") {
        window.location.href ="/index.html";
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

        localStorage.setItem("usuarioid",json.insertId);

    }).catch(function(error) {
        console.log(error.message);
    })
}