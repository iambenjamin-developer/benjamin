using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BenjaminWebApp.Controllers
{
    public class ProductoController : Controller
    {

        Models.dbExperienciasDataContext db = new Models.dbExperienciasDataContext();


        public JsonResult DatosComboBox()
        {
            var lista = db.Rubros.Select(columna => new { ID = columna.IdRubro, DESCRIPCION = columna.Descripcion }).ToList();


            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DatosTabla()
        {


            var lista = db.Productos.Where(parametro => parametro.Activo.Equals(true))
                .Select(columna => new
                {
                    columna.IdProducto,
                    columna.Nombre,
                    columna.Descripcion,
                    columna.Precio,
                    columna.Cantidad,
                    columna.FechaVencimiento,
                    columna.Categoria,



                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public string ConvertirDateTimeToDateTimeString(DateTime fecha)
        {
            string fechaString = string.Empty;


            return fechaString;
        }


        public JsonResult Fechas()
        {

            Models.Fechas fecha1 = new Models.Fechas(20, 12, 1985);


            Models.Fechas fecha2 = new Models.Fechas(20, 04, 1994);


            Models.Fechas fecha3 = new Models.Fechas(15, 09, 1943);


            Models.Fechas fecha4 = new Models.Fechas(5, 6, 1990);


            List<Models.Fechas> lista = new List<Models.Fechas>();

            lista.Add(fecha1);
            lista.Add(fecha2);
            lista.Add(fecha3);
            lista.Add(fecha4);

            /*
             
            if dato es string
            evaluar 6 digitos si es fecha
            si es fecha aplicar formato

             Ejemplo: /Date(1334514600000)/  —–>  dd/mm/yyyy

var fechaString = “\/Date(1334514600000)\/”.substr(6);
var fechaActual = new Date(parseInt(fechaString ));
var mes = fechaActual.getMonth() + 1;
var dia =  fechaActual.getDate();
var anio = fechaActual.getFullYear();
var fecha = dia + “/” + mes + “/” + anio;
alert(fecha);

The following two tabs change content below.

             
             */

            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public JsonResult FormatoFecha(int id)
        {


            var lista = db.Productos.Where(parametro => parametro.IdProducto.Equals(id))
                .Select(columna => new
                {
                    columna.FechaVencimiento

                }).FirstOrDefault();


            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Tabla()
        {
            return View();
        }
    }
}