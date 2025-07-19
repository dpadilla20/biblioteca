using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio;
using Microsoft.EntityFrameworkCore;

namespace Persistencia
{
    public class OrdenContext : DbContext
    {
        public OrdenContext(DbContextOptions options) : base(options) { }

        public DbSet<Orden> Orden { get; set; }
        public DbSet<OrdenDetalle> OrdenDetalle { get; set; }
        public DbSet<Pago> Pago { get; set; }
    }
}