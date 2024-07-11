// fetch

fetch('http://localhost:3000/mascota/listado/')
  .then(response => response.json())
  .then(data => mostrarDatos(data))


let contenidoTabla;

function mostrarDatos(datos){

      console.log(datos);

      contenidoTabla = "<tr> <th>Id</th> <th>Nombre</th> <th>Descripcion</th> <th>NroControl</th><th>Imagen</th> </tr> "

      datos.forEach(elemento => {
        contenidoTabla = contenidoTabla + "<tr> <td>" + elemento.id  + "</td> <td style='width: 15%;'>" + elemento.nombre + "</td> <td style='width: 20%;'>" + elemento.descripcion +  "</td> <td style='width: 20%;'>" + elemento.control + "</td> <td><img src= 'http://localhost:3000/" + elemento.imagen  + "' style='width: 70%;'>" + "</td></tr> "
        
      });

      document.querySelector("table").innerHTML = contenidoTabla;

}

