let formulario = document.getElementById("formulario");
let nombre = document.getElementById("nombre");
let descripcion = document.getElementById("descripcion");
let control = document.getElementById("control"); 
let imagen = document.getElementById("exampleFormControlFile1");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let url = 'http://localhost:3000/mascota/alta';
    let formData = new FormData();

    formData.append('nombre', nombre.value);
    formData.append('descripcion', descripcion.value);
    formData.append('control', control.value);
    formData.append('imagen', imagen.files[0]); // Asegúrate de que se adjunta el archivo correctamente

    fetch(url, {
        method: 'POST',
        body: formData
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
          console.log('Success:', response);
          formulario.reset();
          document.getElementById("imagePreview").src = "";
          alert("Formulario de Datos Enviado Exitosamente");
          location.href = "./../admin.html";
      });
});

document.getElementById("cancelar").addEventListener("click", () => {
    location.href = "./../admin.html";
});

function previewImage(event) {
    const reader = new FileReader();
    const imageField = document.getElementById("imagePreview");

    reader.onload = function() {
        if (reader.readyState == 2) {
            imageField.src = reader.result;
        }
    }
    reader.readAsDataURL(event.target.files[0]);
}

function previewImage(event) {
    const reader = new FileReader();
    const imageField = document.getElementById("imagePreview");
    imageField.className.display = ""

    reader.onload = function() {
        if (reader.readyState == 2) {
            imageField.src = reader.result;
            imageField.style.display = 'block';
        }
    }
    reader.readAsDataURL(event.target.files[0]);
}


