function iniciarMap() {
  var coord = { lat: -34.5956145, lng: -58.4431949 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.mosd').addEventListener('click', function() {
    console.log('Botón de la sección clickeado');
    
    var secciones = document.querySelectorAll('.contenido');
    secciones.forEach(function(seccion) {
      seccion.classList.add('oculto');
    });

    var seccionAgendar = document.getElementById('agendar');
    seccionAgendar.classList.remove('oculto');
  });
});
