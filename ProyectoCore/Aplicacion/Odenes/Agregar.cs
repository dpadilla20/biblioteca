using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Dominio;
using Persistencia;

namespace Aplicacion.Ordenes
{
    public class OrdenDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public decimal Total { get; set; }
        public string Estado { get; set; } = null!;
        public string TipoEntrega { get; set; } = null!;
        public string Observaciones { get; set; }
        public int? SedeId { get; set; }
        public string SedeNombre { get; set; }
        public ICollection<OrdenDetalleOutputDto> Detalles { get; set; } = new List<OrdenDetalleOutputDto>();
    }

    public class OrdenDetalleOutputDto
    {
        public int Id { get; set; }
        public int ProductoId { get; set; }
        public string ProductoNombre { get; set; } = null!;
        public string TipoProducto { get; set; }
        public string Formato { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal { get; set; } // Incluimos el subtotal calculado
    }

    public class Agregar
    {
        public class Ejecuta : IRequest<OrdenDto>
        {
            [Required(ErrorMessage = "El ID de usuario es obligatorio.")]
            [Range(1, int.MaxValue, ErrorMessage = "El ID de usuario debe ser un número positivo.")]
            public int UserId { get; set; }

            [Required(ErrorMessage = "El total de la orden es obligatorio.")]
            [Range(0.01, 1000000.00, ErrorMessage = "El total debe ser un valor positivo y válido.")]
            public decimal Total { get; set; }

            [Required(ErrorMessage = "El tipo de entrega es obligatorio.")]
            [StringLength(50, ErrorMessage = "El tipo de entrega no puede exceder 50 caracteres.")]
            [RegularExpression("^(retiro|delivery)$", ErrorMessage = "El tipo de entrega debe ser 'retiro' o 'delivery'.")]
            public string TipoEntrega { get; set; } = null!;

            [StringLength(500, ErrorMessage = "Las observaciones no pueden exceder 500 caracteres.")]
            public string Observaciones { get; set; }

            public int? SedeId { get; set; }

            [StringLength(100, ErrorMessage = "El nombre de la sede no puede exceder 100 caracteres.")]
            public string SedeNombre { get; set; }

            [Required(ErrorMessage = "La orden debe tener al menos un detalle de producto.")]
            public List<OrdenDetalleDto> OrdenDetalleLista { get; set; } = new List<OrdenDetalleDto>();
        }

        public class OrdenDetalleDto
        {
            [Required(ErrorMessage = "El ID del producto es obligatorio.")]
            public int ProductoId { get; set; }

            [Required(ErrorMessage = "El nombre del producto es obligatorio.")]
            [StringLength(255)]
            public string ProductoNombre { get; set; } = null!;

            [StringLength(50)]
            public string TipoProducto { get; set; }

            [StringLength(20)]
            public string Formato { get; set; }

            [Required(ErrorMessage = "La cantidad es obligatoria.")]
            [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser al menos 1.")]
            public int Cantidad { get; set; }

            [Required(ErrorMessage = "El precio unitario es obligatorio.")]
            [Range(0.01, double.MaxValue, ErrorMessage = "El precio unitario debe ser un valor positivo.")]
            public decimal PrecioUnitario { get; set; }
        }

        // 2. Manejador del comando
        public class Manejador : IRequestHandler<Ejecuta, OrdenDto>
        {
            private readonly OrdenContext _context;

            public Manejador(OrdenContext context)
            {
                _context = context;
            }

            public async Task<OrdenDto> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                if (request.TipoEntrega == "retiro" && (!request.SedeId.HasValue || string.IsNullOrWhiteSpace(request.SedeNombre)))
                {
                    throw new ValidationException("Para el tipo de entrega 'retiro', SedeId y SedeNombre son obligatorios.");
                }
                if (request.OrdenDetalleLista == null || request.OrdenDetalleLista.Count == 0)
                {
                    throw new ValidationException("La orden debe contener al menos un detalle de producto.");
                }


                var orden = new Orden
                {
                    UserId = request.UserId,
                    FechaCreacion = DateTime.Now,
                    Total = request.Total,
                    Estado = "PENDIENTE",
                    TipoEntrega = request.TipoEntrega,
                    Observaciones = request.Observaciones,
                    SedeId = request.SedeId,
                    SedeNombre = request.SedeNombre,
                    OrdenDetalleLista = new List<OrdenDetalle>(),
                };

                foreach (var detalleDto in request.OrdenDetalleLista)
                {
                    orden.OrdenDetalleLista.Add(new OrdenDetalle
                    {
                        ProductoId = detalleDto.ProductoId,
                        ProductoNombre = detalleDto.ProductoNombre,
                        TipoProducto = detalleDto.TipoProducto,
                        Formato = detalleDto.Formato,
                        Cantidad = detalleDto.Cantidad,
                        PrecioUnitario = detalleDto.PrecioUnitario,
                        Orden = orden
                    });
                }

                _context.Orden.Add(orden);
                var result = await _context.SaveChangesAsync(cancellationToken);

                if (result > 0)
                {
                    return new OrdenDto
                    {
                        Id = orden.Id,
                        UserId = orden.UserId,
                        FechaCreacion = orden.FechaCreacion,
                        Total = orden.Total,
                        Estado = orden.Estado,
                        TipoEntrega = orden.TipoEntrega,
                        Observaciones = orden.Observaciones,
                        SedeId = orden.SedeId,
                        SedeNombre = orden.SedeNombre,
                        Detalles = orden.OrdenDetalleLista.Select(od => new OrdenDetalleOutputDto
                        {
                            Id = od.Id,
                            ProductoId = od.ProductoId,
                            ProductoNombre = od.ProductoNombre,
                            TipoProducto = od.TipoProducto,
                            Formato = od.Formato,
                            Cantidad = od.Cantidad,
                            PrecioUnitario = od.PrecioUnitario,
                            Subtotal = od.Subtotal
                        }).ToList(),

                    };
                }

                throw new ApplicationException("Error al guardar la orden en la base de datos.");
            }
        }
    }
}
