const express = require(`express`);
const app = express();


//Crear carpeta estatica
app.use(express.static(`public`));
app.use(express.json());

//Crear conexion con mysql:

const mysql = require("mysql2");
const connection = mysql.createConnection({
 
    host: "localhost",
    user: "root",
    password: "volador25",
    database: "proyectecommerce",
})

app.get(
    `/hello`,
    function (error,response) {
        response.send({message: "Hello World"})
    });


connection.connect(function(error) {
    if (error) {
        return console.error(`error: ${error.message}`);
      }  
    console.log("Conectado a MySQL!!") ;
});


//------------------------------------------------------------Endpoints para carrito---------------------
//Desde carrito trae informacion de tres tablas unidas : compras - compraproducto - productos
app.get(`/compras/:id`, function(request,response) {
    
    connection.query(
        `select * from productos`, function(error,result,fields) {
            if (error) {
                response.status(400).send(`error ${error.message}`);
                return;
              }
              console.log(result);
              response.send(result);
        });
    
    });

//--------------------------TERMINA ENDPOINTS CARRITO--------------------------------------------------------

app.listen(8000, function () {
    console.log("API up and running")
});
    