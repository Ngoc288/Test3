using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeService:IBaseService<Employee>
    {
        /// <summary>
        /// Lấy danh sách nhân viên theo phòng ban
        /// </summary>
        /// <param name="departmentId"></param>
        /// <returns>Danh sách nhân viên</returns>
        /// createdby ngochtb(01/12/2020)
        IEnumerable<Employee> GetEmployeesByDepartment(Guid departmentId);
        /// <summary>
        /// Lấy danh sách nhân viên theo chức vụ
        /// </summary>
        /// <param name="positionId"></param>
        /// <returns>Danh sách nhân viên</returns>
        /// createdby ngochtb(01/12/2020)
        IEnumerable<Employee> GetEmployeesByPosition(Guid positionId);

    }
}
