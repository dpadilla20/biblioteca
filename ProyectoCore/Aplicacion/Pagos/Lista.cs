using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Persistencia;

namespace Aplicacion.Pagos
{
    public class Lista
    {
        public class ListaPago : IRequest<List<Dominio.Pago>> { }

        public class Manejador : IRequestHandler<ListaPago, List<Dominio.Pago>>
        {
            private readonly OrdenContext _context;
            public Manejador(OrdenContext context)
            {
                _context = context;
            }

            public async Task<List<Dominio.Pago>> Handle(ListaPago request, System.Threading.CancellationToken cancellationToken)
            {
                var pagos = await _context.Pago.ToListAsync();
                return pagos;
            }
        }
    }
}