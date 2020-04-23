using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QRKey.Models
{
    public class QRCode
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public long Created { get; set; }
        public long Validity { get; set; }
        public string Client_Name { get; set; }
        public string Client_Phone { get; set; }
        public ApplicationUser User { get; set; }
    }

    public class QRView
    {
        public string Code { get; set; }
        public long Created { get; set; }
        public long Validity { get; set; }
    }
}
