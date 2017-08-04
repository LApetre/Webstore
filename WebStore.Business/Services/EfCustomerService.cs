using System.Linq;
using WebStore.Common.Entities;
using WebStore.Common.Services;
using System.Data.Entity;
using WebStore.Common.Models;
using System;

namespace WebStore.Business.Services
{
    public class EfCustomerService : EfEntityService<Customer>, ICustomerService
    {
        public EfCustomerService(WSContext context) : base(context)
        {
        }

        public Customer GetByName(string name)
        {
            return context.Set<Customer>().Where(p => p.Name == name).First();
        }
    }
}
