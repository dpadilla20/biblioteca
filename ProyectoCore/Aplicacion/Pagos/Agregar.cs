using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Dominio;
using Persistencia;

namespace Aplicacion.Pagos
{
    public class PagoDto
    {
        public int Id { get; set; }

        public int ordenId { get; set; }
        public DateTime FechaPago { get; set; }
        public decimal Monto { get; set; }
        public string MetodoPago { get; set; } = null!;
        public string Estado { get; set; } = null!;
        public string ReferenciaPago { get; set; }
    }


    public class Agregar
    {
        public class Ejecuta : IRequest<List<PagoDto>>
        {
            [Required(ErrorMessage = "La orden debe tener al menos un pago.")]
            public List<PagoDto> PagoLista { get; set; } = new List<PagoDto>();
        }

        public class Manejador : IRequestHandler<Ejecuta, List<PagoDto>>
        {
            private readonly OrdenContext _context;

            public Manejador(OrdenContext context)
            {
                _context = context;
            }

            public async Task<List<PagoDto>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                if (request.PagoLista == null || request.PagoLista.Count == 0)
                {
                    throw new ValidationException("La orden debe contener al menos un detalle de pago.");
                }

                var pagos = request.PagoLista.Select(p => new Pago
                {
                    OrdenId = p.ordenId,
                    Monto = p.Monto,
                    MetodoPago = p.MetodoPago,
                    Estado = p.Estado,
                    ReferenciaPago = p.ReferenciaPago,
                    FechaPago = p.FechaPago
                }).ToList();

                _context.Pago.AddRange(pagos);

                var result = await _context.SaveChangesAsync(cancellationToken);

                if (result <= 0)
                {
                    throw new ApplicationException("Error al guardar los pagos en la base de datos.");
                }

                var pagosDto = pagos.Select(p => new PagoDto
                {
                    Id = p.Id,
                    Monto = p.Monto,
                    MetodoPago = p.MetodoPago,
                    Estado = p.Estado,
                    ReferenciaPago = p.ReferenciaPago,
                    FechaPago = p.FechaPago
                }).ToList();

                return pagosDto;
            }
        }
    }
}
