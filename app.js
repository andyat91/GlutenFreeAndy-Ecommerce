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
    console.log(compraid)
      
        connection.query(
            `SELECT productos.id,productos.nombre,productos.precio,productos.foto,SUM(compraproducto.cantidad) as cantidades FROM compras JOIN compraproducto ON compras.id = compraproducto.compraid
            JOIN productos ON productos.id = compraproducto.productoid WHERE compras.id ="${compraid}" GROUP BY productos.nombre`,
             function(error,result,fields) {
                if (error) {
                    response.status(400).send(`error ${error.message}`);
                    return;
                  }
                  
                  response.send(result);
            });
        
        });
//--------------------------TERMINA ENDPOINTS CARRITO--------------------------------------------------------


//-----------------------------------------------------------------------------Endpoints Pasarela de pago------

//Muestra datos de tarjeta del usuario, teniendo guardada la tarjeta y los muestra con asteriscos

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
                    //con un for convertimos los primeros 12 numeros en asteriscos el resto es la numeracion de cada tarjeta
                    for( let j=0 ; j<result[i].numerotarjeta.length ; j++) {
                      if(j<12) {
                        asterisco += "*";
                      } else {
                        asterisco += result[i].numerotarjeta[j];
                      }
                    }
                    result[i].numerotarjeta = asterisco;
                }


            response.send(result);
          //  console.log(result);
            });


    });

//insert para añadir nueva tarjeta
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
           response.send({message:"Tarjeta añadida correctamente"});

            });
    });
//------Endopoints para finalizar compra------------------------------------------------------------------------------------------------------------------------------------------------------

//Nos muestra la tarjeta seleccionada
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

  //añade direccion  de envio 
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
      let usuarioid = request.body.usuarioid;

      //console.log(numerotarjeta,titulartarjeta,tipotarjeta,caducidad,CVV,idusuario)
      connection.query(
         `INSERT into direccionenvio (nombre, apellidos, telefono, email,calle,numero, provincia,CP, pais,usuarioid) VALUES ("${nombre}","${apellidos}","${telefono}","${email}","${calle}","${numero}","${provincia}","${CP}","${pais}",${usuarioid})`,
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

  //actualiza los datos de la compra nueva a pagados y añade direccion de envio y tarjeta
  app.post("/pagofinal/:compraid", function(request,response) {

    let compraid = request.params.compraid;
    let preciofinal = request.body.preciofinal;
    let direccionenvio =request.body.direccionenvio;
    let tarjeta = request.body.tarjeta;

    connection.query(
      `update compras set pagado=1,preciofinal =${preciofinal},direccionenvio="${direccionenvio}",tarjeta="${tarjeta}" where id = "${compraid}"`,
      function(error,result,fields) {
        if (error) {
          response.status(400).send(`error ${error.message}`);
          return;
        } 
        response.send({message:"compra finalizada"});
      });
  });


  //----Endpoints para crear o añadir compra----------------------------------------------------------------------------------------------------------------------

  //crear dos querys una que grabe en compra nueva y me rellene compraid y precio y otra que inserte una vez que tengo caompraid
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
      response.send({message:"Producto nuevo añadido al carrito"}); 

      
    });

});


//4º UPDATE compraproducto cantidades 

app.post(`/cantidad`, function(request,response) {

  let productoid = request.body.productoid;
  let compraid = request.body.compraid;
  let cantidad = request.body.cantidad
  connection.query(
    `UPDATE compraproducto SET cantidad = cantidad +${cantidad} WHERE compraid = ${compraid} AND productoid = ${productoid}`,
    function(error,result,fields) {
      if(error) {
        response.status(400).send(`error ${error.message}`); 
        return;
      } 
      response.send({message:"actualizado carrito"})
    });
})

//5º DELETE algun producto TODA LA CANTIDAD

app.delete(`/eliminarproducto`, function(request,response) {

  let productoid=request.body.productoid;
  let compraid=request.body.compraid;
 

  connection.query(
    `DELETE FROM compraproducto WHERE compraid = ${compraid} AND productoid = ${productoid}`,
    function(error,result,fields) {
      if(error) {
        response.status(400).send(`error ${error.message}`); 
        return;
      }
      response.send({message:"Producto eliminado"});
    })

});

//6º eliminar ultima linea donde compraid y producto id para que reduzca cantidad
app.post(`/reducircantidad`, function(request,response) {

  let productoid=request.body.productoid;
  let compraid=request.body.compraid;
  let cantidad=request.body.cantidad;

  connection.query(
    `UPDATE compraproducto SET cantidad = cantidad -${cantidad} WHERE compraid = ${compraid} AND productoid = ${productoid}`,
    function(error,result,fields) {
      if(error) {
        response.status(400).send(`error ${error.message}`); 
        return;
      } 
      response.send({message:"actualizado carrito"})
    });

});

//6º actualizar informacion sobre compra nueva 

 app.get(`/comprobar`,  function(request,response) {

   let productoid = request.query.productoid;
   let compraid = request.query.compraid;


   connection.query(
    `SELECT * FROM compraproducto where compraid=${compraid} and productoid=${productoid};`,
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

});

//------Registro

app.post(`/registro`, function(request,response) {

  let nombre= request.body.nombre;
  let apellidos = request.body.apellidos;
  let email = request.body.email;
  let password = request.body.password;

  connection.query(
    `insert into usuario (nombre,apellidos,email,password) values ("${nombre}","${apellidos}","${email}","${password}")`,
    function(error,result,fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
        return;
      }  
    response.send(result);
    });
});

//--------Endpoints para descripcion producto----------------------------------------------------------------------------------------------------------------------
//El producto que aparece en descripcion se coge de la query de productos, aqui hay que hacer un join para las especificaciones

app.get(`/especificacion/:productoid`, function(request,response) {

  let productoid = request.params.productoid;


  connection.query(
    `SELECT especificacion.texto,productos.caracteristicas1,productos.caracteristicas2,productos.caracteristicas3 FROM productos JOIN especificacionproducto ON productos.id = especificacionproducto.idproducto JOIN especificacion ON especificacionproducto.idespecificacion = especificacion.id where productos.id = ${productoid}`,
    function(error,result,fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
        return;
      } 
    response.send(result); 
    
    });
});

//---Endpoint para mostrar span de carrito en index--------------------------------------------------------------------------------------------------------------------

app.get(`/spancarrito`, function(request,response) {


  let compraid= request.query.compraid;

  connection.query(
    `SELECT SUM(cantidad) as span FROM compraproducto WHERE compraid = ${compraid}`,
    function(error,result,fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
        return;
      } 
    response.send(result);  
    });
});













//---------------------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(8000, function () {
    console.log("API up and running")
});
    