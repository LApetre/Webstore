using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebStore.Common.Entities
{
    public class OrderDetail : IEntity
    {
        [Column("Id")]
        public  int Id { get; set; }

        public virtual int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }

        public virtual int OrderId { get; set; }
        [ForeignKey("OrderId")]
        public  Order Order { get; set; }

        public decimal Price { get; set; }
        public decimal Quantity { get; set; }
        public decimal TotalPriceWithoutDiscount { get; set; }
        public decimal TotalPrice { get; set; }


        public void CalculatePrices()
        {
            TotalPriceWithoutDiscount = Price * Quantity;
            TotalPrice = TotalPriceWithoutDiscount * (100 - Order.DiscountPercent)/100.0m;
        }

    }
}
