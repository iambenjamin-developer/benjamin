using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BenjaminWebApp.Models
{
    public class Fechas
    {
        /*

        // Display currency data field in the format $1,345.50.
        [DisplayFormat(DataFormatString = "{0:C}")]
        public object StandardCost;

        // Display date data field in the short format 11/12/08.
        // Also, apply format in edit mode.
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:d}")]
        public object SellStartDate;

        */

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "dd-MM-yyyy")]
        public DateTime? Vencimiento { get; set; }

        public Fechas() { }

        public Fechas(int dia, int mes, int anio)
        {

            Vencimiento = new DateTime(anio, mes, dia);
        }


    }
}