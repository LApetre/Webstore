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
    public class CustomersController : ApiController
    {

        private static string connectionString = @"Data Source=.;Initial Catalog=WebStore;User ID=sa;Password=1234%asd";
        private static WSContext context;

        static CustomersController()
        {

                context = new WSContext(connectionString);
        }

        public Customer GetCustomer(int id)
        {
            var rep = new EfCustomerService(context);
            return rep.GetById(id);
        }

        [HttpPost]
        public void PostCustomer(Customer customer)
        {
            var rep = new EfCustomerService(context);
            rep.Save(customer);
        }

        public IEnumerable<Customer> GetAllCustomers()
        {
            var rep = new EfCustomerService(context);
            return rep.GetAll();
        }

        [HttpDelete]
        public void DeleteCustomer1(int cid)
        {
            var rep = new EfCustomerService(context);
            var customer = rep.GetById(cid);
            if (customer != null)
            {
                if (rep.GetAll().Contains(customer))
                {
                        rep.Delete(customer);

                }
            }
        }

        public PageData<Customer> GetPage(int pageNumber, int pageSize, string nameFilter, decimal discountStart, decimal discountEnd)
        {
            var query = context.Set<Customer>().AsQueryable();
            
            if (nameFilter!=null) query=query.Select(x=>x).Where(x => (x.Name.StartsWith(nameFilter)));
            if (discountStart != -1)
                query=query.Select(x => x).Where(x => (x.DiscountPercent >= discountStart));

            if (discountEnd != -1)
                query=query.Select(x => x).Where(x => (x.DiscountPercent <= discountEnd));
                
            var page = new PageData<Customer>();
            int c = query.Count();
            int p;
            if (c % pageSize > 0)
                p = c / pageSize + 1;
            else p = c / pageSize;
            page.Size = p;
            page.Data = query.OrderBy(x=>x.Name).Skip(pageNumber * pageSize).Take(pageSize).ToList();

            return page;
        }


    }
}
