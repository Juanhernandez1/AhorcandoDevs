using Microsoft.AspNetCore.Mvc;
using ServiceAhorcado;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AhorcandoDevs.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class JuegoController : ControllerBase
    {
        // GET: PalabrasAhorcado O palabrasahorcado
        [HttpGet]
        public IEnumerable<Juego> Get()
        {
            IEnumerable<Juego> datos;
            using (Service1Client client = new Service1Client())
            {
                datos = client.GetData();
            }
            return datos.ToArray();
        }

        // GET api/<JuegoController>/5
        [HttpGet("{id}")]
        public Juego Get(int id)
        {
            Juego datos;
            using (Service1Client client = new Service1Client())
            {
                datos = client.Getgame(id);
            }
            return datos;
        }

        // POST api/<JuegoController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<JuegoController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<JuegoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
