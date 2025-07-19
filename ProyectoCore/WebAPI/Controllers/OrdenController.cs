using System.Collections.Generic;
using System.Threading.Tasks;
using Aplicacion.Ordenes;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdenController : ControllerBase
    {
        private readonly IMediator _mediator;
        public OrdenController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Orden>>> Get()
        {
            return await _mediator.Send(new Lista.ListaOrden());
        }

        [HttpPost]
        public async Task<ActionResult<OrdenDto>> Agregar(Agregar.Ejecuta data)
        {
            var ordenDto = await _mediator.Send(data);
            return CreatedAtAction(nameof(Get), new { id = ordenDto.Id }, ordenDto);
        }
    }
}
