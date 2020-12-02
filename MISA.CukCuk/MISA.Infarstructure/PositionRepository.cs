using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Infarstructure
{
    public class PositionRepository:BaseRepository<Position>, IPositionRepository
    {
        #region DECLARE
        #endregion

        public PositionRepository(IConfiguration configuration) : base(configuration)
        {

        }

        public override IEnumerable<Position> GetEntities()
        {
            return base.GetEntities("Proc_Positions");
        }
    }
}
