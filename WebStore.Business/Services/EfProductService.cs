
using System.Linq;
using WebStore.Common.Entities;
using WebStore.Common.Services;
using System.Data.Entity;
using WebStore.Common.Models;
using System;

namespace WebStore.Business.Services
{
    public class EfProductService : EfEntityService<Product>, IProductService
    {
        public EfProductService(WSContext context) : base(context)
        {
        }

        public Product GetByName(string name)
        {
            var prod=context.Set<Product>().Where(p => p.Name == name).First();
            return prod;
        }
    }
}
