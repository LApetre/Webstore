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
    public class OrderDetailController : ApiController
    {

        private static string connectionString = @"Data Source=.;Initial Catalog=WebStore;User ID=sa;Password=1234%asd";
        private static WSContext context;


        static OrderDetailController()
        {
                context = new WSContext(connectionString);
        }

        public OrderDetail GetDetail(int id)
        {
            var rep = new EfOrderDetailService(context);
            return rep.GetById(id);
        }
    }
}
