using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebStore.Common.Entities;
using WebStore.Common.Services;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.ModelConfiguration.Conventions;
namespace WebStore.Business.Services
{
    public class EfOrderDetailService : EfEntityService<OrderDetail>
    {
        public EfOrderDetailService(WSContext context) : base(context)
        {
        }
        public override List<OrderDetail> GetAll()
        {
            return context.OrderDetail.Include(x => x.Product).ToList();
        }
        public override OrderDetail GetById(int id)
        {
            return context.OrderDetail.Include(x => x.Product).Where(x=>x.Id==id).SingleOrDefault();
        }
    }
}
