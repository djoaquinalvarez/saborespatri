//Ajustamos el height a toda la pantalla
$(document).ready(function(){

    var height = $(window).height();

    $('.food--section').height(height);

});

//CARGAR EL DETALLE DE PEDIDO

//1. Tomamos los valores del diccionario
//2. Creamos las etiquetas HTML para la tabla
//3. Cargamos los valores del diccionario en la tabla
//4. Hacemos que las etiquetas td sean hijos de las tr (filas y columnas) 
//5. Hacemos que la etiqueta tr sea hija del table ("appendChild()")

var table = document.querySelector("tabla-detalle");
