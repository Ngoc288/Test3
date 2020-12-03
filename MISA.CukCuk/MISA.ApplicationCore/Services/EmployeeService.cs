using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository):base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public IEnumerable<Employee> GetEmployeesByDepartment(Guid departmentId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> GetEmployeesByPosition(Guid positionId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> GetEmployeesByPossition(Guid PossitionId)
        {
            throw new NotImplementedException();
        }

    
    }
}
