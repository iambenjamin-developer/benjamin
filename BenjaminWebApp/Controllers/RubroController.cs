using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BenjaminWebApp.Controllers
{
    public class RubroController : Controller
    {

        public ActionResult Tabla()
        {
            return View();
        }


        Models.dbExperienciasDataContext db = new Models.dbExperienciasDataContext();

        public JsonResult Datos()
        {
            var lista = db.Rubros.Select(columna => new { ID = columna.IdRubro, DESCRIPCION = columna.Descripcion }).ToList();


            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public JsonResult RegistroSeleccionado(int id)
        {


            var lista = db.Rubros.Where(parametro => parametro.IdRubro.Equals(id))
                .Select(columna => new
                {
                    columna.IdRubro,
                    columna.Descripcion


                }).First();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int AgregarEditar(Models.Rubro obj)
        {

            int nroRegistrosAfectados = 0;

            try
            {
                //si el ID es cero agregar objeto
                if (obj.IdRubro == 0)
                {

                    db.Rubros.InsertOnSubmit(obj);
                    db.SubmitChanges();

                    nroRegistrosAfectados = 1;


                }//si el ID es distinto de cero editar entidad
                else
                {

                    //Models.Producto objUpdate = db.Productos
                    //    .Where(parametro => parametro.IdProducto.Equals(obj.IdProducto)).First();

                    //objUpdate.Nombre = obj.Nombre;
                    //objUpdate.Descripcion = obj.Descripcion;
                    //objUpdate.Foto = obj.Foto;
                    //objUpdate.Precio = obj.Precio;
                    //objUpdate.Cantidad = obj.Cantidad;
                    //objUpdate.FechaAlta = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
                    //objUpdate.FechaVencimiento = obj.FechaVencimiento;
                    //objUpdate.IdRubro = obj.IdRubro;
                    //objUpdate.Categoria = obj.Categoria;

                    //db.SubmitChanges();
                    //nroRegistrosAfectados = 1;
                }
            }
            catch (Exception ex)
            {
                nroRegistrosAfectados = 0;
                throw;
            }

            return nroRegistrosAfectados;
        }

        public int Eliminar(Models.Rubro obj)
        {

            int nroRegistrosAfectados = 0;

            try
            {

                var objEliminar = db.Rubros.Where(parametro => parametro.IdRubro.Equals(obj.IdRubro)).First();

                db.Rubros.DeleteOnSubmit(objEliminar);
                db.SubmitChanges();

                nroRegistrosAfectados = 1;
            }
            catch (Exception ex)
            {

                nroRegistrosAfectados = 0;
            }


            return nroRegistrosAfectados;
        }










    }
}