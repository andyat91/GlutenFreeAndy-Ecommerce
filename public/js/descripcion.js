window.addEventListener("load",productosdescripcion());


function productosdescripcion(productoid) {

//let productoid = localStorage.getItem("producto");
console.log(productoid);
    fetch(`http://localhost:8000/productos/${productoid}`, 
    
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
                  <h3>${json[i].nombre}</h3>
                  <p>
                  ${json[i].descripcioncorta}
                  </p>
                  <h4>${json[i].precio}€</h4>
                 
                  <button class="btn" onclick="addProducto(${json[i].id})">Añadir al carrito</button>
                  <p>Devoluciones aceptadas</p>
                </div>
              </div>
              <div class="caracteristicasespecificaciones">
                <div class="caracteristicas">
                
                  <h4>Caracteristicas del producto</h4>
                  <div>
                 
                    <p><i class="bi bi-check2-circle"></i>
                    ${json[i].caracteristicas1}
                    </p>
                  </div>
                  <div>
                   
                    <p><i class="bi bi-check2-circle"></i>
                    ${json[i].caracteristicas2}
                    </p>
                  </div>
                  <div>
                 
                    <p><i class="bi bi-check2-circle"></i>
                    ${json[i].caracteristicas3}
                    </p>
                  </div>
                </div>
              
            
                      <div id="especificaciones">
                        <ul>
                          <li>singlute</li>
                          <li>lactofree</li>
                          <li>heuvofree</li>
                          <li>vainilla</li>
                          <li>frutossecos</li>
                          <li></li>
                        </ul>
                      </div>
               </div>`
            }
        }
//localStorage.removeItem("producto");
    }).catch(function(error) {
        console.log(error);

    })
}