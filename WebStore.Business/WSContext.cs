using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using WebStore.Common.Entities;
namespace WebStore.Business
{

    public class WSContext : DbContext
    {
        public WSContext(string connectionString):base(connectionString)
        {
            this.Configuration.LazyLoadingEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<WSContext>(null);
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Customer> Customer { get; set; }
        public DbSet<Product> Product { get; set; }

        public DbSet<OrderDetail> OrderDetail { get; set; }
        public DbSet<Order> Order { get; set; }


    }

}
