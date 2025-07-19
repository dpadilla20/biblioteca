using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Persistencia;

namespace Aplicacion.Ordenes
{
    public class Lista
    {
        public class ListaOrden : IRequest<List<Dominio.Orden>> { }

        public class Manejador : IRequestHandler<ListaOrden, List<Dominio.Orden>>
        {
            private readonly OrdenContext _context;
            public Manejador(OrdenContext context)
            {
                _context = context;
            }

            public async Task<List<Dominio.Orden>> Handle(ListaOrden request, System.Threading.CancellationToken cancellationToken)
            {
                var ordenes = await _context.Orden.ToListAsync();
                return ordenes;
            }
        }
    }
}