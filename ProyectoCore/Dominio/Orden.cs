using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dominio
{
    using System;
    public class Orden
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public decimal Total { get; set; }
        public string Estado { get; set; }
        public string TipoEntrega { get; set; }
        public string Observaciones { get; set; }
        public int? SedeId { get; set; }
        public string SedeNombre { get; set; }

        public ICollection<OrdenDetalle> OrdenDetalleLista { get; set; }
        public ICollection<Pago> PagoLista { get; set; }

    }
}