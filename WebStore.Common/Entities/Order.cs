using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebStore.Common.Entities
{
    public class Order : IEntity
    {
        [Column("Id")]
        public int Id { get; set; }

        public DateTime OrderDate { get; set; }
        public decimal DiscountPercent { get; set; }

        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }

        [InverseProperty("Order")]
        public List<OrderDetail> OrderLines { get; set; }
    }
}
