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
    //changeMonth: true,
    //changeYear: true,
    dateFormat: 'dd/mm/yy',
    minDate: new Date('1985-12-21'),
    maxDate: '+3Y +1M +2D'
};
$.datepicker.setDefaults($.datepicker.regional['es']);


/*


$(document).ready(function(){
 // Date Object
 $('#datepicker1').datepicker({
  dateFormat: "yy-mm-dd",
  maxDate: new Date('2018-3-26')
 });

 // Number
 $('#datepicker2').datepicker({
  dateFormat: "yy-mm-dd",
  maxDate: 2
 });

 // String
 $('#datepicker3').datepicker({
  dateFormat: "yy-mm-dd",
  maxDate: "+1m"
 });
});

    minDate: 0,
    maxDate: "+1D 1M +1Y"

  minDate: "-1D -1M -36Y",
    maxDate: "+1D 1M +1Y"

 */