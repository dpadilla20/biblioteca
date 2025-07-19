using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio
{
    using System;
    public class OrdenDetalle
    {
        public int Id { get; set; }
        public int OrdenId { get; set; }
        public int ProductoId { get; set; }
        public string ProductoNombre { get; set; }
        public string TipoProducto { get; set; }
        public string Formato { get; set; }
        public int Cantidad { get; set; }

        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal => Cantidad * PrecioUnitario;

        public Orden Orden { get; set; }
    }
}