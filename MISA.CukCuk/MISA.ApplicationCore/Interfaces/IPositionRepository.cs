using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface danh mục vị trí
    /// </summary>
    /// createdby ngochtb(01/12/2020)
    public interface IPositionRepository: IBaseRepository<Position>
    {
        /// <summary>
        /// Lấy danh sách vị trí theo mã vị trí
        /// </summary>
        /// <param name="positionCode"></param>
        /// <returns></returns>
        //Position GetPositionByCode(string positionCode);
    }
}
