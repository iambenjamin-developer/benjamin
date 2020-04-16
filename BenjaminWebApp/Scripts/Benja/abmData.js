﻿//Iniciamos todos los componentes por defecto para que funcionen las tablas
inicializar();



function inicializar() {
    //setear parametros por defecto datepickers
    setearConfiguraciones();

    //cargar load de componentes
    iniciarlizarComponentes();


    

}
function setearConfiguraciones() {

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


    moment.locale("es");

}
function iniciarlizarComponentes() {

    //rellenarComboBox Filtro("Controlador", "Json_Accion","idTag")
    rellenarComboBox("Producto", "DatosComboBox", "combobox-data");


    //rellenarComboBox PopUp("Controlador", "Json_Accion","idTag")
    rellenarComboBox("Producto", "DatosComboBox", "cboIdRubro");


    //CABECERA DE LA TABLA
    var arrayCabecera = ["ID", "NOMBRE", "DESCRIPCION", "PRECIO", "CANTIDAD", "FECHA DE VENCIMIENTO",
        "CATEGORIA", "ACCIONES"];
    //rellenarTabla("Controlador", "Json_Accion","idTag", arrayCabeceraString)
    rellenarTabla("Producto", "DatosTabla", "tabla-data", arrayCabecera);

    $('#dtpFechaVencimiento').datepicker();

}


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
    
    console.log("Fila Nº: " + nroFila);
    console.log("Columna Nº: " + nroColumna);
    console.log(dato);

    //buscar la columna con campo fecha
    if (nroColumna == 5) {

        if (dato == null) {
            //Si la fecha es nula devolver la cadena No Aplica
            return "No aplica";
        } else {

           return moment(dato).format('L');
        }
        
    }

    return dato;
}
function abrirModal(controlador, jsonAccion, id) {

    //ruta -= /Controlador/Accion/?id=parametro
    var ruta = "/";
    ruta += controlador + "/";
    ruta += jsonAccion + "/";
    ruta += "?id=" + id;


    if (id == 0) {
        //si es cero vamos a agregar datos
        limpiarDatos();

    } else { //si es distinto de cero vamos a agregar datos

        $.get(ruta, function (data) {


            document.getElementById("txtIdDocente").value = data[0].IIDDOCENTE;
            document.getElementById("txtNombre").value = data[0].NOMBRE;
            document.getElementById("txtApellidoPaterno").value = data[0].APPATERNO;
            document.getElementById("txtApellidoMaterno").value = data[0].APMATERNO;
            document.getElementById("txtDireccion").value = data[0].DIRECCION;
            document.getElementById("txtTelefonoFijo").value = data[0].TELEFONOFIJO;
            document.getElementById("txtTelefonoCelular").value = data[0].TELEFONOCELULAR;
            document.getElementById("txtEmail").value = data[0].EMAIL;
            document.getElementById("cboSexoPopUp").value = data[0].IIDSEXO;
            document.getElementById("dtpFechaContrato").value = data[0].FECHA_CONTRATO;
            document.getElementById("cboModalidadContratoPopUp").value = data[0].IIDMODALIDADCONTRATO;
            document.getElementById("imgFoto").value = data[0].FOTO;


        });
    }
}

function limpiarDatos() {

    limpiarTextBoxes();
    limpiarComboBoxes();
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