using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebStore.Common.Entities;
using WebStore.Common.Services;
using System.Data.Entity;
using WebStore.Common.Models;

namespace WebStore.Business.Services
{
    public class EfOrderService : EfEntityService<Order>, IOrderService

    {
        public EfOrderService(WSContext context) : base(context)
        {
        }

        public override void Delete(Order entity)
            {
            
            if (entity != null)
            {
                var set = context.Set<OrderDetail>();
                OrderDetail[] ol=new OrderDetail[entity.OrderLines.Count()];
                 entity.OrderLines.CopyTo(ol) ;
                if (entity.OrderLines != null)
                    foreach (OrderDetail od in ol)
                        set.Remove(od);

                context.Set<Order>().Remove(entity);
            }
            context.SaveChanges();
        }


        public OrderSummary[] ReportByDateRange(DateTime startDate, DateTime endDate)
        {
            IQueryable<Order> query = context.Set<Order>(); 
            if (startDate!=null)
                 query=query.Where(p => ((p.OrderDate >= startDate)));

            if (endDate != null)
                query = query.Where(p => p.OrderDate <= endDate);

            var ordersummaries = new List<OrderSummary>();
            foreach(var order in query.ToList())
            {
                var osum = new OrderSummary { Id = order.Id };
                osum.LinesCount = order.OrderLines.Count();
                osum.TotalPriceWithoutDiscount = order.OrderLines.Sum(p => p.TotalPriceWithoutDiscount);
                osum.TotalPrice = order.OrderLines.Sum(p => p.TotalPrice);
                ordersummaries.Add(osum);
            }
            return ordersummaries.ToArray();
        }

        public override List<Order> GetAll()
        {
            return context.Order.Include(x => x.Customer).Include(x => x.OrderLines).ToList();
        }
        public override Order GetById(int id)
        {
            return context.Order.Include(x =>  x.OrderLines).Include(x=> x.Customer).Where(x => x.Id == id).SingleOrDefault();
        }

        public override void Save(Order entity)
        {
            var linerep = new EfOrderDetailService(context);

            if (entity.OrderLines.Count > 0)
            {
                foreach (var line in entity.OrderLines)
                {
                    line.Order = entity;
                   // line.OrderId = entity.Id;
                }
            }

            base.Save(entity);
        }
    }
}
