let id = document.getElementById("id");
let btnConsultar = document.getElementById("btnConsultar");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("descripcion");
let formulario = document.getElementById("formulario");
let imagenProbando = document.getElementById("imagenProbando");


id.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
      event.preventDefault(); // Evitar que se envíe un formulario si hay uno
      btnConsultar.click();
  }
});

btnConsultar.addEventListener("click", ()=>{

    fetch('http://localhost:3000/mascota/modificar/' + id.value)
    .then(response => response.json())
    .then(data =>{
            nombre.value = data[0].nombre;
            descripcion.value = data[0].descripcion;
            control.value = data[0].control;
            imagenProbando.src = "http://localhost:3000/" + data[0].imagen;
    }) 
})

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function() {
      imagenProbando.src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  let formData = new FormData();
  formData.append('nombre', nombre.value);
  formData.append('descripcion', descripcion.value);
  formData.append('control', control.value);
  if (imagen.files[0]) {
      formData.append('imagen', imagen.files[0]);
  }

  fetch('http://localhost:3000/mascota/modificar/' + id.value, {
      method: 'PUT',
      body: formData
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        alert("Formulario de Datos Enviado Exitosamente");
        location.href = "./../admin.html";
    });
});


document.getElementById("cancelar").addEventListener("click", () => {
  location.href = "./../admin.html";
});
