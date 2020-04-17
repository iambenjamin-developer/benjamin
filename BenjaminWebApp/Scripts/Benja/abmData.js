//Iniciamos todos los componentes por defecto para que funcionen las tablas
inicializar();

function inicializar() {
    //setear parametros por defecto datepickers
    configuracionDatePicker();

    //rellenarComboBox Filtro("Controlador", "Json_Accion","idTag")
    rellenarComboBox("Producto", "DatosComboBox", "combobox-data");


    //rellenarComboBox PopUp("Controlador", "Json_Accion","idTag")
    rellenarComboBox("Producto", "DatosComboBox", "cboIdRubro");

    /*
    //CABECERA DE LA TABLA
    var arrayCabecera = ["ID", "NOMBRE", "DESCRIPCION", "PRECIO", "CANTIDAD", "FECHA DE VENCIMIENTO",
        "CATEGORIA", "ACTIVO", "ACCIONES"];
    //rellenarTabla("Controlador", "Json_Accion","idTag", arrayCabeceraString)
    rellenarTabla("Producto", "DatosTabla", "tabla-data", arrayCabecera);
    */

    mostrarTabla();

    $('#dtpFechaVencimiento').datepicker();




}

function mostrarTabla() {
    //CABECERA DE LA TABLA
    var arrayCabecera = ["ID", "NOMBRE", "DESCRIPCION", "PRECIO", "CANTIDAD", "FECHA DE VENCIMIENTO",
        "CATEGORIA", "ACTIVO", "ACCIONES"];
    //rellenarTabla("Controlador", "Json_Accion","idTag", arrayCabeceraString)
    rellenarTabla("Producto", "DatosTabla", "tabla-data", arrayCabecera);
}


//CONFIGURACIONES
function configuracionDatePicker() {

    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '< Ant',
        nextText: 'Sig >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        minDate: '-60Y',
        maxDate: '+1Y',
    };

    $.datepicker.setDefaults($.datepicker.regional['es']);
}

function parsearBoolean(booleano) {

    if (booleano == true) {
        return "SI";
    } else { return "NO"; }
};

function parsearMoneda(decimal) {

    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(decimal);
};

function parsearFecha(fecha) {


    if (fecha != null) {

        moment.locale("es");

        return moment(fecha).format('L');

    } else {

        return "No Aplica";
    }


};


function parsearFechaNullVacio(fecha) {


    if (fecha != null) {

        moment.locale("es");

        return moment(fecha).format('L');

    } else {

        return "";
    }


};


//RELLENAR COMPONENTES
function rellenarComboBox(controlador, jsonAccion, stringID) {

    var ruta = "/";
    ruta += controlador + "/";
    ruta += jsonAccion + "/";


    $.get(ruta, function (data) {

        //string q representa las etiquetas html
        var contenido = "<option value='0'>--Seleccione--</option>";

        for (var i = 0; i < data.length; i++) {

            contenido += "<option value='" + data[i].ID + "'>";
            contenido += data[i].DESCRIPCION;
            contenido += "</option>";
        }

        //transformar la cadena en html e insertar dentro del id del combo box
        document.getElementById(stringID).innerHTML = contenido;


    });

}

function rellenarTabla(controlador, jsonAccion, idTag, arrayCabecera) {

    var ruta = "/";
    ruta += controlador + "/";
    ruta += jsonAccion + "/";


    $.get(ruta, function (data) {

        var contenido = "";

        contenido += "<table id='tabla-paginacion-registros' class='table table-striped'>";
        contenido += "<thead>";
        contenido += "<tr>";

        // se rellena la cabecera con los nombres de las columnas seteados en el array
        for (var i = 0; i < arrayCabecera.length; i++) {
            contenido += "<th>";
            contenido += arrayCabecera[i];
            contenido += "</th>";
        }
        contenido += "</th>";
        contenido += "</thead>";
        contenido += "<tbody>";

        // con las llaves descomponemos el data en grupo de arrays de cada columna
        var arrayColumnas = Object.keys(data[0]);

        for (var i = 0; i < data.length; i++) {

            contenido += "<tr>";

            for (var j = 0; j < arrayColumnas.length; j++) {
                // data[i] = fila Json completa
                // arrayColumnas[j] = nombre de la columna
                // data[i][idColumna] = [filacompleta][nombreColumna] = valor de la celda

                var idColumna = arrayColumnas[j];

                contenido += "<td>";
                //contenido de cada celda formatear dato(datoCelda, nroFila, nroColumna)
                contenido += formatearDato(data[i][idColumna], i, j);
                contenido += "</td>";

            }
            var idItem = data[i][arrayColumnas[0]];
            //agregamos los iconos
            contenido += "<td>";
            contenido += "<button id='btnEditar' class='btn btn-primary' onclick='abrirModal(" + idItem + ")' data-toggle='modal' data-target='#exampleModal'><i class='fas fa-edit'></i></button>   ";
            contenido += "<button id='btnEliminar' class='btn btn-danger' onclick='eliminar(" + idItem + ")'  ><i class='fas fa-trash-alt'></i></button>";
            contenido += "</td>";

            contenido += "</tr>";
        }

        contenido += "</tbody>";

        //podemos rellenar lo que hay en la cabecera tambien en el pie de pagina
        contenido += "<tfoot>";
        contenido += "<tr>";

        // se rellena la cabecera(en el foot) con los nombres de las columnas seteados en el array
        for (var i = 0; i < arrayCabecera.length; i++) {
            contenido += "<th>";
            contenido += arrayCabecera[i];
            contenido += "</th>";
        }
        contenido += "</tr>";
        contenido += "</tfoot>";
        contenido += "</table>";


        document.getElementById(idTag).innerHTML = contenido;

        $("#tabla-paginacion-registros").dataTable({
            "language":
            {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla =(",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }
            }

        }); // fin datatable




    });//fin $.get


}

function formatearDato(dato, nroFila, nroColumna) {

    //console.log("Fila Nº: " + nroFila);
    //console.log("Columna Nº: " + nroColumna);
    //console.log(dato);

    //buscar la columna con campo fecha
    if (nroColumna == 5) {

        return parsearFecha(dato);
    }

    //buscar la columna con campo moneda
    if (nroColumna == 3) {

        return parsearMoneda(dato);
    }

    //buscar la columna con campo booleano
    if (nroColumna == 7) {

        return parsearBoolean(dato);
    }

    return dato;
}


function abrirModal(id) {

    //Si el ID es cero usamos el modal para agregar
    if (id == 0) {

        limpiarDatos();

    }//Si el ID distinto de cero usamos el modal para editar
    else {

        obtenerRegistro("Producto", "RegistroSeleccionado", id);
    }



}

function obtenerRegistro(controlador, jsonAccion, id) {

    //ruta = /Controlador/Accion/?id=parametro
    var ruta = "/";
    ruta += controlador + "/";
    ruta += jsonAccion + "/";
    ruta += "?id=" + id;

    console.log(ruta);

    $.get(ruta, function (data) {

        /*
        console.log(JSON.stringify(data));
        console.log(data.IdProducto);
        console.log(data.Nombre);
        console.log(data.Descripcion);
        console.log(data.Precio);
        console.log(data.Cantidad);
        console.log(data.FechaVencimiento);
        console.log(data.IdRubro * 1);
        console.log(data.Categoria);
        console.log(data.Foto);
        */

        document.getElementById("txtIdProducto").value = data.IdProducto;
        document.getElementById("txtNombre").value = data.Nombre;
        document.getElementById("txtDescripcion").value = data.Descripcion;
        document.getElementById("txtPrecio").value = data.Precio;
        document.getElementById("txtCantidad").value = data.Cantidad;
        document.getElementById("dtpFechaVencimiento").value = parsearFechaNullVacio(data.FechaVencimiento);
        document.getElementById("cboIdRubro").value = data.IdRubro;
        document.getElementById("txtCategoria").value = data.Categoria;
        document.getElementById("imgFoto").src = "data:image/png;base64," + data.FOTOMOSTRAR;

    });
}

function limpiarDatos() {

    limpiarTextBoxes();
    limpiarComboBoxes();

    document.getElementById("imgFoto").value = null;
}

function limpiarTextBoxes() {

    //se limpian todos los textboxes dejando un string vacio
    var controles = document.getElementsByClassName("limpiar");

    for (var i = 0; i < controles.length; i++) {

        controles[i].value = "";
    }
}

function limpiarComboBoxes() {

    //se limpian todos los comboboxes dejando string vacio
    var controles = document.getElementsByClassName("limpiarCbo");

    for (var i = 0; i < controles.length; i++) {

        controles[i].value = 0;
    }

}


function datosObligatorios() {

    var bandera = true;
    var contadorBandera = 0;

    var elementos = document.getElementsByClassName("obligatorio");

    var idLabel = "";

    for (var i = 0; i < elementos.length; i++) {
        //creamos nombre de label
        idLabel = "lbl" + elementos[i].id;

        if (elementos[i].value != "") {

            document.getElementById(idLabel).innerHTML = "&nbsp;<i class='fas fa-check' style='color:green;'></i>";
        } else {

            document.getElementById(idLabel).innerHTML = "&nbsp;<i class='far fa-times-circle' style='color:red;'></i>";

            //contar las veces que dio falso
            contadorBandera = contadorBandera + 1;
        }

    }


    //chequear si da verdadero o falso
    if (contadorBandera > 0) {
        bandera = false;
    }

    return bandera;
}




function agregarEditar() {


    if (datosObligatorios() == true) {


        var frm = new FormData();

        //colocar en una variable el valor de cada elemento
        var idProducto = document.getElementById("txtIdProducto").value;
        var nombre = document.getElementById("txtNombre").value;
        var descripcion = document.getElementById("txtDescripcion").value;
        var precio = document.getElementById("txtPrecio").value.replace(".", ",");
        var cantidad = document.getElementById("txtCantidad").value;
        var fechaAlta = moment(Date.now()).format('L');;
        var fechaVencimiento = document.getElementById("dtpFechaVencimiento").value;
        var idRubro = document.getElementById("cboIdRubro").value;
        var categoria = document.getElementById("txtCategoria").value;
        var foto = document.getElementById("imgFoto").src.replace("data:image/png;base64,", "");


  

        //relacionar el valor de cada elemento con la clase que le corresponde
        frm.append("IdProducto", idProducto);
        frm.append("Nombre", nombre);
        frm.append("Descripcion", descripcion);
        frm.append("Precio", precio);
        frm.append("Cantidad", cantidad);
        frm.append("FechaAlta", fechaAlta);
        frm.append("FechaVencimiento", fechaVencimiento);
        frm.append("IdRubro", idRubro);
        frm.append("Categoria", categoria);
        frm.append("cadenaFoto", foto);
        frm.append("Activo", true);

        console.log(idProducto);
        console.log(nombre);
        console.log(descripcion);
        console.log(precio);
        console.log(cantidad);
        console.log(fechaAlta);
        console.log(fechaVencimiento);
        console.log(idRubro);
        console.log(categoria);
        console.log(foto);



        if (confirm("¿Desea Confirmar Guardar?") == 1) {

            $.ajax({
                type: "POST",
                url: "/Producto/AgregarEditarConFoto/",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {

                        mostrarTabla();

                        if (idProducto == 0)
                            alert("Agregado Exitosamente");
                        else
                            alert("Editado Exitosamente");

                        document.getElementById("btnCancelar").click();


                    } else {
                        alert("Error agregarEditar()");
                    }

                }

            })

        } //fin confirmacion



    } else {

    }
}


function eliminar(id) {

    var frm = new FormData();

    frm.append("IdProducto", id);


    if (confirm("¿Seguro que quiere eliminar el registro??") == 1) {

        $.ajax({
            type: "POST",
            url: "/Producto/Eliminar/",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data != 0) {

                    mostrarTabla();

                    alert("Registro eliminado!");

                    document.getElementById("btnCancelar").click();
                } else {
                    alert("Error eliminar(id)");
                }

            }

        })

    } //fin confirmacion
}


function inactivar(id) {


    var frm = new FormData();

    frm.append("IdProducto", id);


    if (confirm("¿Seguro que quiere inactivar el registro??") == 1) {

        $.ajax({
            type: "POST",
            url: "/Producto/Inactivar/",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data != 0) {

                    alert("Registro Inactivo!");

                    mostrarTabla();

                    document.getElementById("btnCancelar").click();

                } else {
                    alert("Error");
                }

            }

        })

    } //fin confirmacion
}

function eliminarGet(id) {



    if (confirm("Esta seguro de eliminar registro?(GET)") == 1) {


        $.get("/Producto/InactivarGet/?id=" + id, function (data) {

            if (data == 0) {

                alert("Ocurrió un error eliminarGet(id)");
            } else {

                alert("Se inactivó correctamente");
                mostrarTabla();

                document.getElementById("btnCancelar").click();
            }


        });
    }

}




var btnFoto = document.getElementById("btnFoto");

btnFoto.onchange = function (e) {

    //capturamos el
    var file = document.getElementById("btnFoto").files[0];

    var reader = new FileReader();

    if (reader != null) {

        reader.onloadend = function () {

            var img = document.getElementById("imgFoto");

            img.src = reader.result;

            //se muestra el  archivo en base de 64 bits
            //alert(reader.result);
        }
    }


    reader.readAsDataURL(file);

}