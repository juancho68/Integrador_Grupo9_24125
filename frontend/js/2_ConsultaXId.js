let id = document.getElementById("id");

let btnConsultar = document.getElementById("btnConsultar");

btnConsultar.addEventListener("click", () => {

    fetch('http://localhost:3000/mascota/listado/' + id.value)
    .then(response => response.json())
    .then(data => mostrarDatos(data))
    .catch(error => console.error('Error:', error))

})

let contenidoTabla;

function mostrarDatos(datos){

      console.log(datos);


      contenidoTabla = "<tr> <th>Id</th> <th>Nombre</th> <th>Descripcion</th> <th>NroControl</th> <th>Imagen</th> </tr> "


      datos.forEach(elemento => {
        contenidoTabla = contenidoTabla + "<tr> <td>" + elemento.id  + "</td> <td>" + elemento.nombre + "</td> <td>" + elemento.descripcion + "</td> <td>" + elemento.control +  "</td> <td><img src= 'http://localhost:3000/" + elemento.imagen  + "' style='width: 80%;'>" + "</td></tr> "
        
      });

      document.querySelector("table").innerHTML = contenidoTabla;

}


