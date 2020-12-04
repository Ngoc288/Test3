using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeRepository: IBaseRepository<Employee>
    {
        /// <summary>
        /// hàm lọc theo các trường
        /// </summary>
        /// <param name="specs">Họ tên , số điện thoại, mã</param>
        /// <param name="DepartmentId">mã phòng ban</param>
        /// <param name="PossitionId">mã vị chí chức vụ</param>
        /// <returns></returns>
        IEnumerable<Employee> GetEntityFilter(string specs, Guid? DepartmentId , Guid? PossitionId);
    }
}
