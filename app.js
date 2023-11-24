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

connection.connect(function(error) {
    if (error) {
        return console.error(`error: ${error.message}`);
      }  
    console.log("Conectado a MySQL!!") ;
});


//------------------------------------------------------------Endpoints para carrito---------------------
//Desde carrito trae informacion de tres tablas unidas : compras - compraproducto - productos

    app.get(`/carrito/:compraid`, function(request,response) {


    const compraid = request.params.compraid;
      
        connection.query(
            `SELECT productos.nombre,productos.precio,compraproducto.cantidad,productos.foto FROM compras JOIN compraproducto ON compras.id = compraproducto.compraid
            JOIN productos ON productos.id = compraproducto.productoid WHERE compras.id ="${compraid}"`, function(error,result,fields) {
                if (error) {
                    response.status(400).send(`error ${error.message}`);
                    return;
                  }
                  console.log(result);
                  response.send(result);
            });
        
        });
//--------------------------TERMINA ENDPOINTS CARRITO--------------------------------------------------------


//-----------------------------------------------------------------------------Endpoints Pasarela de pago------
//Queremos mostrar los numeros de tarjeta asociado a su usuario mediante un for y por su id

    app.get(`/pasareladepago/:idusuario`, function(request,response) {


    const idusuario = request.params.idusuario;
    const asterisco = "";
        connection.query(
            `SELECT  usuario.id,usuario.nombre,formadepago.numerotarjeta, formadepago.tipotarjeta FROM formadepago JOIN usuario ON formadepago.usuarioid = usuario.id where usuario.id = "${idusuario}"`,
            function (error,result,fields) {
                if (error) {
                    response.status(400).send(`error ${error.message}`);
                    return;
                  } //lo que quier aqui esque convierta el numero de tarjeta con asteriscos
            for(let i=0 ; i<result.length ; i++) {
                for( let j=0 ; j<result[i].nombre.length ; j++) {
                  if(i<12) {
                    asterisco += "*";
                  } else {
                    asterisco += result[i].numerotarjeta[j];
                  }
                }
                result[i].numerotarjeta = asterisco;
            }
            
            });


    });











app.listen(8000, function () {
    console.log("API up and running")
});
    