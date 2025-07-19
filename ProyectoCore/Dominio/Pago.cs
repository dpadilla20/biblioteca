using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio
{
    public class Pago
    {
        public int Id { get; set; }
        public int OrdenId { get; set; }
        public DateTime FechaPago { get; set; }

        public decimal Monto { get; set; }
        public string MetodoPago { get; set; }
        public string Estado { get; set; }
        public string ReferenciaPago { get; set; }
        public Orden Orden { get; set; }
    }
}