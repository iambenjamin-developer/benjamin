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
$('#dtpFechaContrato').datepicker();



function obtenerComboSexo(tag) {
    $.get("/Alumno/ObtenerSexos/", function (data) {

        //llenarComboBox de sexos
        llenarComboBox(data, tag);

    });
}
function obtenerComboModalidadContrato(tag) {
    $.get("/Docente/ListarModalidadContrato/", function (data) {

        //llenarComboBox de modalidad contrato
        llenarComboBox(data, tag);

    });
}

function mostrarDocentes() {

    $.get("/Docente/ListarDocentes/", function (data) {

        //llenar tabla alumnos
        llenarTabla(["ID", "NOMBRE", "APELLIDO PATERNO", "APELLIDO MATERNO", "DIRECCION", "TELEFONOFIJO",
            "TELEFONO CELULAR", "EMAIL", "FECHA DE CONTRATO", "ACCIONES"], data, "tabla-docentes");

    });

}


function llenarTabla(arrayCabecera, data, idTagString) {

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
            contenido += data[i][idColumna];
            contenido += "</td>";

        }
        var idDocente = data[i][arrayColumnas[0]];
        //agregamos los iconos
        contenido += "<td>";
        contenido += "<button id='btnEditar' class='btn btn-primary' onclick='abrirModal(" + idDocente + ")' data-toggle='modal' data-target='#exampleModal'><i class='fas fa-edit'></i></button>   ";
        contenido += "<button id='btnEliminar' class='btn btn-danger' ><i class='fas fa-trash-alt'></i></button>";
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


    document.getElementById(idTagString).innerHTML = contenido;

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


}
function llenarComboBox(data, idTagString) {

    //string q representa las etiquetas html
    var contenido = "<option value='-1'>--Seleccione--</option>";

    for (var i = 0; i < data.length; i++) {

        contenido += "<option value='" + data[i].ID + "'>";
        contenido += data[i].DESCRIPCION;
        contenido += "</option>";
    }

    //transformar la cadena en html e insertar dentro del id del combo box
    document.getElementById(idTagString).innerHTML = contenido;
}

function abrirModal(idDocente) {

    if (idDocente == -1) {

        limpiarDatos();

    } else {

        $.get("/Docente/EditarDocente/?idDocente=" + idDocente, function (data) {


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

    //se limpian todos los textboxes dejando string vacio
    var controles = document.getElementsByClassName("limpiar");

    for (var i = 0; i < controles.length; i++) {

        controles[i].value = "";
    }




    /*
    alert("limpiar textboxes");

    document.getElementById("txtIdDocente").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidoPaterno").value = "";
    document.getElementById("txtApellidoMaterno").value = "";
    document.getElementById("txtDireccion").value = "";
    document.getElementById("txtTelefonoFijo").value = "";
    document.getElementById("txtTelefonoCelular").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("cboSexoPopUp").value = -1;
    document.getElementById("dtpFechaContrato").value = "";
    document.getElementById("cboModalidadContratoPopUp").value = -1;
    document.getElementById("imgFoto").value = data[0].FOTO;
    */
}

function limpiarComboBoxes() {

    //se limpian todos los comboboxes dejando string vacio
    var controles = document.getElementsByClassName("limpiarCbo");

    for (var i = 0; i < controles.length; i++) {

        controles[i].value = -1;
    }

}

function datosObligatorios() {

    var bandera = true;
    var contadorBandera = 0;

    var elementos = document.getElementsByClassName("obligatorio");

    var idLabel = "string";

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


function agregar() {

    if (datosObligatorios() == true) {


        var frm = new FormData();

        var idDocente = document.getElementById("txtIdDocente").value;
        var nombre = document.getElementById("txtNombre").value;
        var apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
        var apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
        var direccion = document.getElementById("txtDireccion").value;
        var telefonoFijo = document.getElementById("txtTelefonoFijo").value;
        var telefonoCelular = document.getElementById("txtTelefonoCelular").value;
        var email = document.getElementById("txtEmail").value;
        var idSexo = document.getElementById("cboSexoPopUp").value;
        var fechaContrato = document.getElementById("dtpFechaContrato").value;
        var idModalidad = document.getElementById("cboModalidadContratoPopUp").value;
        var imgFoto = document.getElementById("imgFoto").value;


      
       
        frm.append("IIDDOCENTE", 0);
        frm.append("NOMBRE", nombre);
        frm.append("APPATERNO", apellidoPaterno);
        frm.append("APMATERNO", apellidoMaterno);
        frm.append("DIRECCION", direccion);
        frm.append("TELEFONOFIJO", telefonoFijo);
        frm.append("TELEFONOCELULAR", telefonoCelular);
        frm.append("EMAIL", email);
        frm.append("IIDSEXO", idSexo);
        frm.append("FECHACONTRATO", fechaContrato);
        frm.append("IIDMODALIDADCONTRATO", idModalidad);
        frm.append("FOTO", 0);
        frm.append("BHABILITADO", 1);

        console.log(idDocente);
        console.log(nombre);
        console.log(apellidoPaterno);
        console.log(apellidoMaterno);
        console.log(direccion);
        console.log(telefonoFijo);
        console.log(telefonoCelular);
        console.log(email);
        console.log(idSexo);
        console.log(fechaContrato);
        console.log(idModalidad);
        console.log(imgFoto);

        console.log(frm);


        $.ajax({
            type: "POST",
            url: "/Docente/GuardarSexo/",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) { }

        })
    }
    else {

    }
}

obtenerComboSexo("cboSexo");
obtenerComboSexo("cboSexoPopUp");

obtenerComboModalidadContrato("cboModalidadContrato");
obtenerComboModalidadContrato("cboModalidadContratoPopUp");

mostrarDocentes();


