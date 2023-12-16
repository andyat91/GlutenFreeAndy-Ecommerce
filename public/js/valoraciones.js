window.addEventListener("load",valoraciones(0));

function valoraciones(valoracion) {

    let estrellas=[];

    fetch(`http://localhost:8000/valoraciones`
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {


    for(i=0 ; i-json.valoracion ; i++) {
        estrellas[i]= `<i class="bi bi-star "></i>`;
    }
      if(valoracion ==0) {
        const containerVal = document.getElementById("valoracionescaja");
        containerVal.innerHTML = ` 

                                            <button onclick="valoraciones(${valoracion-1})" class="btn hidden"><i class="bi bi-arrow-left hidden"></i></button>
                                        <div>
                                        <h5 class="opinionesdestacadas">Opiniones destacadas</h5>
                                            <p id="valoracionText">${json[valoracion].descripcion} </p>
                                                
                                            <h5>${json[valoracion].usuario}</h5>
                                            <div class="valoracion">
                                            ${Array.from({ length: json[valoracion].valoracion }, () => '<i class="bi bi-star"></i>').join('')}
                                        </div>
                                        </div>
                                            <button onclick="valoraciones(${valoracion+1})" class="btn"><i class="bi bi-arrow-right"></i></button>
                                    `
                //array constructor desde longitud = numero de valoracion y va uniendo estrellas con el join
      } else if(valoracion == json.length-1){

        const containerVal = document.getElementById("valoracionescaja");
        containerVal.innerHTML = ` 

                                            <button onclick="valoraciones(${valoracion-1})" class="btn "><i class="bi bi-arrow-left"></i></button>
                                        <div>
                                            <h5 class="opinionesdestacadas">Opiniones destacadas</h5>
                                            <p id="valoracionText">${json[valoracion].descripcion} </p>
                                                
                                            <h5>${json[valoracion].usuario}</h5>
                                            <div class="valoracion">
                                                ${Array.from({ length: json[valoracion].valoracion }, () => '<i class="bi bi-star"></i>').join('')}
                                            </div>
                                        </div>
                                            <button onclick="valoraciones(${valoracion+1})" class="btn hidden"><i class="bi bi-arrow-right hidden"></i></button>
                                    `
        } else {
            const containerVal = document.getElementById("valoracionescaja");
            containerVal.innerHTML = ` 
    
                                                <button onclick="valoraciones(${valoracion-1})" class="btn "><i class="bi bi-arrow-left"></i></button>
                                            <div>
                                            <h5 class="opinionesdestacadas">Opiniones destacadas</h5>
                                                <p id="valoracionText">${json[valoracion].descripcion} </p>
                                                    
                                                <h5>${json[valoracion].usuario}</h5>
                                                <div class="valoracion">
                                                ${Array.from({ length: json[valoracion].valoracion }, () => '<i class="bi bi-star"></i>').join('')}
                                            </div>
                                            </div>
                                                <button onclick="valoraciones(${valoracion+1})" class="btn "><i class="bi bi-arrow-right"></i></button>
                                        `

        }
    }).catch(function(error) {
        console.log(error)
    })
}