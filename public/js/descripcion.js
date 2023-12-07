window.addEventListener("load",productosdescripcion(),especificacion());


function productosdescripcion() {

//coge la ubicacion por parametros de 
const params=new URLSearchParams(window.location.search);
let productoid = params.get("productoid") ;
console.log(productoid);

localStorage.setItem("productoidE",productoid);
    fetch(`http://localhost:8000/productos`, 
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {
//poner el id cogido del index;
        const container = document.getElementById("productoEspecifico");

        for(let i=0 ; i<json.length ; i++) {
            if(json[i].id == productoid) {

                container.innerHTML = ` <div class="descripcion">
                                            
                                            <img src="${json[i].foto}" alt="Pan Rallado" width="30%" />
            
                                            <div class="producto-desc">
                                            <p>Todos los productos    <i class="bi bi-arrow-right"></i>    Descripcion del producto   <i class="bi bi-arrow-right"></i> ${json[i].nombre} </p>
                                              <h3>${json[i].nombre}</h3>
                                              <h5>
                                              ${json[i].descripcioncorta}
                                              </h5>
                                              <h4>Precio: ${json[i].precio}€ IVA Incluido</h4>
                 
                                              <button class="btn" onclick="addProducto(${json[i].id})">Añadir al carrito</button>
                                              <p>Devoluciones aceptadas <i class="bi bi-shield-fill-check"></i></p>
                                            </div>
                                        </div>`
              console.log(json[i].id)
              }
        }
//localStorage.removeItem("producto");
    }).catch(function(error) {
        console.log(error);

    })
};

function especificacion() {


  let productoid = localStorage.getItem("productoidE");
  console.log(productoid)

  fetch(`http://localhost:8000/especificacion/${productoid}`,
  
  
  ).then(function(response) {
    return response.json()

  }).then(function(json) {
    console.log()

      const especificacion = document.getElementById("especificaciones");
      
      for(i=0; i<json.length ; i++) {
        especificacion.innerHTML += `<li>${json[i].texto} </li>`
      }
     

  }).catch(function(error) {
    console.log()
  })
}