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
                    columna.Activo



                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
              
        public ActionResult Tabla()
        {
            return View();
        }

        public JsonResult RegistroSeleccionado(int id)
        {


            var lista = db.Productos.Where(parametro => parametro.Activo.Equals(true)
            && parametro.IdProducto.Equals(id))
                .Select(columna => new
                {
                    columna.IdProducto,
                    columna.Nombre,
                    columna.Descripcion,
                    columna.Precio,
                    columna.Cantidad,
                    columna.FechaVencimiento,
                    columna.IdRubro,
                    columna.Categoria,
                    columna.Foto



                }).First();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }




    }
}