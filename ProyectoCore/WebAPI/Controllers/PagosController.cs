using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aplicacion.Pagos;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PagosController : ControllerBase
    {
        private readonly IMediator _mediator;
        public PagosController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet]
        public async Task<ActionResult<List<Pago>>> Get()
        {
            return await _mediator.Send(new Lista.ListaPago());
        }
        [HttpPost]
        public async Task<ActionResult<PagoDto>> Agregar(Agregar.Ejecuta data)
        {
            var pagoDto = await _mediator.Send(data);
            return Ok(pagoDto);
        }
    }
}