using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace APIControllers.Controllers
{
    public class HomeController : Controller
    {
        public string Index()
        {
            return "API fonctionnel, Veuillez lancez l'application clientèle ";
        }
    }
}