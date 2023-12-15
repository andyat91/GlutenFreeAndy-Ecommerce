window.addEventListener("load",valoraciones(0));

function valoraciones(valoracion) {


    fetch(`http://localhost:8000/valoraciones`
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {

      

        const containerVal = document.getElementById("valoracionescaja");
        containerVal.innerHTML = ` 

                                            <button onclick="valoraciones(${valoracion-1})" class="btn "><i class="bi bi-arrow-left"></i></button>
                                        <div>
                                            <p id="valoracionText">${json[valoracion].descripcion} </p>
                                                
                                            <h5>${json[valoracion].usuario}</h5>
                                            <div class="valoracion">
                                            <span id="valoracionEstrellas">
                                                    <i class="bi bi-star "></i>
                                                    <i class="bi bi-star "></i>
                                                    <i class="bi bi-star "></i>
                                                    <i class="bi bi-star "></i>
                                                    <i class="bi bi-star "></i>
                                            </span>
                                            </div>
                                        </div>
                                            <button onclick="valoraciones(${valoracion+1})" class="btn"><i class="bi bi-arrow-right"></i></button>
                                    `

    }).catch(function(error) {
        console.log(error)
    })
}