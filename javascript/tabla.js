//VARIABLES CONTADORAS DE PRODUCTOS
let registroArticulosPedidos = new Map();
var cantidadComunes = 0;
var cantidadMediasComunes = 0;

function cargarEventosEscuchadores() {
    var tables = document.querySelectorAll(".table--container");
    var variablesBotones = [];
    var cantidadElementosArray = 0;
    for(var i=0; i < tables.length; i++) {
        var table = tables[i].childNodes[1];
        //console.log(table);
        for (var j=0; j<table.rows.length; j++) {
            var row = table.rows[j];
            for(var k=0; k<row.cells.length;k++){
                var cell = row.cells[k];
                //console.log(cell);
                for(var l=0; l<cell.childNodes.length; l++) {
                    var button = cell.childNodes[l];
                    var idButton = button.id;
                    if (typeof(idButton) != typeof(undefined)) {
                        idButton = "#" + idButton;
                        cantidadElementosArray++;
                        variablesBotones[cantidadElementosArray] = document.querySelector(idButton);
                        if(variablesBotones[cantidadElementosArray].value == "-") {
                            //console.log(variablesBotones[cantidadElementosArray]);
                            variablesBotones[cantidadElementosArray].addEventListener("click", eliminarComun);
                        } else {
                            variablesBotones[cantidadElementosArray].addEventListener("click", adicionarComun);
                            //mentosArray]);
                        }
                        //variablesBotones[cantidadElementosArray].addEventListener("click", adicionarComun);
                    }

                }
            }
        }
    }
    //console.log(variablesBotones);
}

function cargarDiccionario() {
    var tables = document.querySelectorAll(".table--container");
    for(var i=0; i < tables.length; i++) {
        var table = tables[i].childNodes[1];
        for (var j=0; j<table.rows.length; j++) {
            //console.log(table.rows[j]); 
            var row = table.rows[j];
            //console.log(row.nextElementSibling);
            for(var k=0;k<row.cells.length;k++) {
                var elemento = row.cells[k].id;
                var idElemento = "#" + elemento;
                registroArticulosPedidos.set(idElemento, 0);
            } 
            //registroArticulosPedidos.set(keyMap,0);
        }
    }
}

function buscarCantidadArticulo(idArticulo) {
    var cantidad = 0;  
    registroArticulosPedidos.forEach(function(key, value) {
        if(value == idArticulo) {
            cantidad = key;
        }
    })
    return cantidad;
}

function actualizarRegistroPedidos(idArticulo, cantidadActualizada) {
    registroArticulosPedidos.forEach(function(key, value) {
        if(value == idArticulo) {
            registroArticulosPedidos.set(idArticulo, cantidadActualizada);
        }
    })
}

//EJECUCION DE FUNCIONES INICIALES 
cargarDiccionario();
cargarEventosEscuchadores();

//EVENTOS ESCUCHADORES DE LOS BOTONES
//PIZZA COMUN
var buttonMenosComun = document.querySelector("#comun-menos");
buttonMenosComun.addEventListener("click",eliminarComun);

var buttonMasComun = document.querySelector("#comun-mas");
buttonMasComun.addEventListener("click",adicionarComun);



function eliminarComun(evento) {
    var tdPizza = evento.path[1]; //elemento de la fila
    var trPizza = evento.path[2]; //fila
    //extraemos el precio de la tabla
    var precioPizzaText = tdPizza.textContent.substring(1,);
    var precioPizzaNum = parseInt(precioPizzaText)
    //extraemos el precio actual que tiene el total del pedido
    var totalFlotanteText = document.querySelector(".total-flotante");
    var totalPedidoNum = parseInt(totalFlotanteText.textContent.substring(21,));
    //conseguimos la cantidad de articulos pedidos en base a la clase del articulo seleccionado
    var idArticuloPedido = "#" + tdPizza.id;
    //FUNCION PARA BUSCAR LA CANTIDAD DE ESE ARTICULO
    var cantidadPedida = buscarCantidadArticulo(idArticuloPedido);
        if((totalPedidoNum - precioPizzaNum)>=0 && cantidadPedida > 0) {
        totalPedidoNum = totalPedidoNum - precioPizzaNum;
        cantidadPedida--;
        actualizarRegistroPedidos(idArticuloPedido, cantidadPedida); //REVISAR
        if(cantidadPedida == 0) {
            tdPizza.classList.remove("elemento-agregado");
            buttonMasComun.classList.remove("boton-elemento-agregado");
            buttonMenosComun.classList.remove("boton-elemento-agregado");
        }
        //console.log(precioPizzaNum);
        //console.log(totalPedidoNum.toString());
        totalFlotanteText.textContent = "Total de tu pedido: $" + totalPedidoNum.toString();
    }
}

function adicionarComun(evento) {
    var tdPizza = evento.path[1]; //elemento de la fila
    var trPizza = evento.path[2]; //fila
    //extraemos el precio de la tabla
    var precioPizzaText = tdPizza.textContent.substring(1,);
    var precioPizzaNum = parseInt(precioPizzaText)
    //extraemos el precio actual que tiene el total del pedido
    var totalFlotanteText = document.querySelector(".total-flotante");
    var totalPedidoNum = parseInt(totalFlotanteText.textContent.substring(21,));
    //conseguimos la cantidad de articulos pedidos en base a la clase del articulo seleccionado
    var idArticuloPedido = "#" + tdPizza.id;
    //FUNCION PARA BUSCAR LA CANTIDAD DE ESE ARTICULO
    var cantidadPedida = buscarCantidadArticulo(idArticuloPedido);
    totalPedidoNum = totalPedidoNum + precioPizzaNum;
    cantidadPedida++;
    actualizarRegistroPedidos(idArticuloPedido, cantidadPedida); //REVISAR
    tdPizza.classList.add("elemento-agregado");
    buttonMasComun.classList.add("boton-elemento-agregado");
    buttonMenosComun.classList.add("boton-elemento-agregado");
    //console.log(precioPizzaNum);
    //console.log(totalPedidoNum.toString());
    totalFlotanteText.textContent = "Total de tu pedido: $" + totalPedidoNum.toString();
}

