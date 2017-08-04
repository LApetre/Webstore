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
    public class ProductsController : ApiController
    {
        private static string connectionString = @"Data Source=.;Initial Catalog=WebStore;User ID=sa;Password=1234%asd";
        private static WSContext context;

        static ProductsController()
        {

                context = new WSContext(connectionString);
        }

        public Product GetProduct(int id)
        {
            var rep = new EfProductService(context);
            return rep.GetById(id);
        }


        [HttpPost]
        public void PostProduct(Product product)
        {
            var rep = new EfProductService(context);
            rep.Save(product);
        }


        [HttpDelete]
        public void DeleteProduct1(int cid)
        {
            var rep = new EfProductService(context);
            var product = rep.GetById(cid);
            if (product != null)
            {
                if(rep.GetAll().Contains(product))
                        rep.Delete(product);
            }
        }

        public PageData<Product> GetPage(int pageNumber, int pageSize, string nameFilter, decimal priceStart, decimal priceEnd)
        {
            var query = context.Set<Product>().AsQueryable();

            if (nameFilter != null) query = query.Select(x => x).Where(x => (x.Name.StartsWith(nameFilter)));

            if (priceStart != -1)
                query = query.Select(x => x).Where(x => (x.ListPrice >= priceStart));

            if (priceEnd != -1)
                query = query.Select(x => x).Where(x => (x.ListPrice <= priceEnd));

            var page = new PageData<Product>();
            int c = query.Count();
            int p;
            if (c % pageSize > 0)
                p = c / pageSize + 1;
            else p = c / pageSize;

            page.Size = p;
            page.Data = query.OrderBy(x => x.Name).Skip(pageNumber * pageSize).Take(pageSize).ToList();

            return page;
        }

    }

}
