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
    
        connection.query(
            `SELECT  formadepago.numerotarjeta,usuario.id,formadepago.id FROM formadepago JOIN usuario ON formadepago.usuarioid = usuario.id where usuario.id = "${idusuario}"`,
            function (error,result,fields) {
                if (error) {
                    response.status(400).send(`error ${error.message}`);
                    return;
                  } //lo que quier aqui esque convierta el numero de tarjeta con asteriscos
                  for(let i=0 ; i<result.length ; i++) {
                    let asterisco = "";
                    for( let j=0 ; j<result[i].numerotarjeta.length ; j++) {
                      if(j<12) {
                        asterisco += "*";
                      } else {
                        asterisco += result[i].numerotarjeta[j];
                      }
                     // result[j].numerotarjeta = asterisco;
                    }
                    result[i].numerotarjeta = asterisco;
                }


            response.send(result);
          //  console.log(result);
            });


    });

    app.post("/pasareladepago", function(request,response) {

        let usuarioid = request.body.usuarioid;
        let numerotarjeta = request.body.numerotarjeta;
        let titulartarjeta = request.body.titulartarjeta;
        let tipotarjeta = request.body.tipotarjeta;
        let caducidad = request.body.caducidad;
        let CVV = request.body.CVV;
        //console.log(numerotarjeta,titulartarjeta,tipotarjeta,caducidad,CVV,idusuario)
        console.log(usuarioid);
        connection.query(
            `insert into formadepago (numerotarjeta,titulartarjeta,tipotarjeta,caducidad,CVV,usuarioid) values ("${numerotarjeta}","${titulartarjeta}","${tipotarjeta}","${caducidad}","${CVV}","${usuarioid}")`,
            function(error,result,fields) {
                if (error) {
                    response.status(400).send(`error ${error.message}`);
                    return;
                  }
           //   console.log(result) ;
           response.send({message:"compra finalizada"});

            });
    });
//------Endopoints para finalizar compra------------------------------------------------------------------------------------------------------------------------------------------------------

    app.get("/mostrartarjeta/:idtarjeta", function(request,response) {
      //failed to fetch
   //   let tarjetaid = request.body.tarjetaid;

      let idtarjeta = request.params.idtarjeta;
      connection.query(
        //aqui es donde tiene que venir el id de la tarjeta guardada antes.
        `select numerotarjeta from formadepago where id = ${idtarjeta}`,
        function(error,result,fields) {
          if (error) {
            response.status(400).send(`error ${error.message}`);
            return;
          }
        response.send(result[0].numerotarjeta);
        console.log(result);
        });

    });

   
    app.post("/finalizarcompra", function(request,response) {


      let nombre = request.body.nombre;
      let apellidos = request.body.apellidos;
      let telefono = request.body.telefono;
      let email = request.body.email;
      let calle = request.body.calle;
      let numero = request.body.numero;
      let provincia = request.body.provincia;
      let CP = request.body.CP;
      let pais = request.body.pais;

      //console.log(numerotarjeta,titulartarjeta,tipotarjeta,caducidad,CVV,idusuario)
      connection.query(
         `INSERT into direccionenvio (nombre, apellidos, telefono, email,calle,numero, provincia,CP, pais,usuarioid) VALUES ("${nombre}","${apellidos}","${telefono}","${email}","${calle}","${numero}","${provincia}","${CP}","${pais}",5)`,
          function(error,result,fields) {
              if (error) {
                console.log(error);
                  response.status(400).send(`error ${error.message}`);
                  return;
                }
         //   console.log(result) ;
        response.send({message:"compra finalizada"});

          });
  });











app.listen(8000, function () {
    console.log("API up and running")
});
    