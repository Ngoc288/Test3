using MISA.ApplicationCore.Interfaces;
using System;
using MISA.ApplicationCore.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Controllers
{
   
    public class PositionsController : BaseEntityController<Position>
    {
        IBaseService<Position> _baseService;
        public PositionsController(IBaseService<Position> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
