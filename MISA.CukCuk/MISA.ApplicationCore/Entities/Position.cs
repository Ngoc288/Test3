using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Vị trí
    /// </summary>
    /// createdby ngochtb(01/12/2020)
    public class Position: BaseEntity
    {
        /// <summary>
        /// Khóa chính
        /// </summary>
        /// createdby ngochtb(01/12/2020)
        public Guid PositionId { get; set; }
        /// <summary>
        /// Mã vị trí
        /// </summary>
        /// createdby ngochtb(01/12/2020)
        public string PositionCode { get; set; }
        /// <summary>
        /// Tên vị trí
        /// </summary>
        /// createdby ngochtb(01/12/2020)
        public string PositionName { get; set; }
    }
}
