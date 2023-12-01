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
        response.send({message:"Direccion registrada"});

          });
  });

  app.post("/pagofinal/:compraid", function(request,response) {

    let compraid = request.params.compraid;

    connection.query(
      `update compras set pagado=1 where id = "${compraid}"`,
      function(error,result,fields) {
        if (error) {
          response.status(400).send(`error ${error.message}`);
          return;
        } 
        response.send({message:"compra finalizada"});
      });
  });


  //----Endpoints para crear o añadir compra----------------------------------------------------------------------------------------------------------------------

  //crear dos querys una que grabe en compra nueva y me rellene compraid y precio y otra que inserte una vez que tengo caompraid inserte
  //inserte en compraproducto productoid y compraid;

//1º Que muestre las tarjetas tal cual con los productos.

app.get(`/productos`, function(request,response) {



  connection.query(
    `select * from productos`,
    function(error,result,fields) {
      if(error) {
        response.status(400).send(`error ${error.message}`); 
        return;
      }
 
    response.send(result);
   
    });
});


//2º insert usuarioid en compras
//Select del id de la nueva compra
app.post(`/nuevacompra/:usuarioid`, function(request,response) {


  let usuarioid = request.params.usuarioid;

  connection.query(
    `INSERT INTO compras (usuarioid,pagado) VALUES (${usuarioid},0)`,
    function(error,result,fields) {
      if(error) {
        response.status(400).send(`error ${error.message}`); 
        return;
      } 
    response.send(result);
    });
});




//3º insert en compraproducto con el id de compra, el producto y la cantidad
app.post(`/compraproducto/:usuarioid`, function(request,response) {

  let usuarioid = request.params.usuarioid;
  let compraid =request.body.compraid;
  let productoid =request.body.productoid;
  let cantidad =request.body.cantidad;

  connection.query(
    `insert INTO compraproducto (compraid,productoid,cantidad) VALUES (${compraid},${productoid},${cantidad})`,
    function(error,result,fields) {
      if(error) {
        response.status(400).send(`error ${error.message}`); 
        return;
      }
      response.send(result); 
    });

});

//-----Endpoints para login y registro---------------------------------------------------------------------------------------------------------------------------


app.post("/login", function (request, response) {
  //Creamos una variable donde se va a hacer el request.query para poner menos cosas en el connection query
  const email = request.body.email;
  const password = request.body.password;
  console.log(email, password);
  //consulta con usuarios
  //select * usuarios donde el email es igual al que ponemos en request y contraseña igual
  //connection.query tiene una funcion dentro, si error mostrar mensaje y si ok realizar consulta.
  //Mysql necesita doble comillas para poner dentro una var.
  connection.query(
    `select id from usuario where email = "${email}" and password = "${password}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
        return;
      }
      //recorreme el array y si no hay ninguna coincidencia entre email y contraseña devuelve "email o contraseña mal"
      if (result.length == 0) {
        response.send({ message: "email o contraseña mal" });
        //si encuentra una coincidencia de ambos se loguea.
      } else {
        console.log(result);
        response.send({ message: "logueado" });
      }
    });
});

app.post(`/loginok`, function(request,response) {

  const email = request.body.email;

  connection.query(
    `select id from usuario where email ="${email}" `,
    function(error,result,fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
        return;
      }
    response.send(result);
    });

})















//---------------------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(8000, function () {
    console.log("API up and running")
});
    