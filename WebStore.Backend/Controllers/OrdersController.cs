using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebStore.Common.Entities;
using WebStore.Business.Services;
using WebStore.Business;
using System.Data.Entity;
using WebStore.Backend.Models;

namespace WebStore.Backend.Controllers
{
    public class OrdersController : ApiController
    {


        private static string connectionString = @"Data Source=.;Initial Catalog=WebStore;User ID=sa;Password=1234%asd";
        private static WSContext context;


        static OrdersController()
        {
                context = new WSContext(connectionString);
        }

        public Order GetOrder(int id)
        {
            var rep = new EfOrderService(context);
            var order = rep.GetById(id);
            order.OrderLines = context.OrderDetail.Where(x => x.OrderId == id).Include(x=>x.Product).ToList();
            order.OrderLines.ForEach(x => x.Order = null);
            return order;
        }

        [HttpPost]
        public void PostOrder(Order order)
        {
            var rep = new EfOrderService(context);
            rep.Save(order);

        }


        [HttpDelete]
        public void DeleteOrder1(int cid)
        {
            var rep = new EfOrderService(context);
            var order = rep.GetById(cid);
            if (order != null)
                rep.Delete(order);
        }

        public PageData<Order> GetPage(int pageNumber, int pageSize, int customerId, decimal discountStart, decimal discountEnd, DateTime? from=null, DateTime? to=null)
        {

            var query = context.Order.Include(x=>x.Customer).AsQueryable();

            var customer = context.Customer.Find(customerId);
            if(customer!=null)
                query = query.Select(x => x).Where(x => x.Customer.Id == customerId);

            if (discountStart != -1)
                query = query.Select(x => x).Where(x => (x.DiscountPercent >= discountStart));

            if (discountEnd != -1)
                query = query.Select(x => x).Where(x => (x.DiscountPercent <= discountEnd));

            if (from != null)
                query = query.Select(x => x).Where(x => (x.OrderDate >= from));

            if (to != null)
                query = query.Select(x => x).Where(x => (x.OrderDate <= to));
            var page = new PageData<Order>();
            int c = query.Count();
            int p;
            if (c % pageSize > 0)
                p = c / pageSize + 1;
            else p = c / pageSize;
            page.Size = p;
            query = query.OrderBy(x => x.OrderDate).Skip(pageNumber * pageSize).Take(pageSize).Include(x => x.OrderLines);
            foreach (var x in query)
                x.OrderLines.ForEach(y => y.Order = null);
            page.Data = query.ToList();
            //query.ForEachAsync(x => context.Entry(x).State = EntityState.Detached);
            return page;
        }


    }

}