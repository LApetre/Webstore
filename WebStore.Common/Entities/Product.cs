using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebStore.Common.Entities
{
    public class Product : IEntity
    {
        [Column("Id")]
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal ListPrice { get; set; }
    }
}
