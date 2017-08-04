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
    public class EfEntityService<T> : IEntityService<T>
        where T:class,IEntity, new()
    {
        protected WSContext context;

        public EfEntityService(WSContext context)
        {
            this.context = context;
        }

        public virtual void Delete(T entity)
        {

            if (entity != null)
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        
                        context.Set<T>().Remove(entity);
                        //context.Entry(entity).State = EntityState.Deleted;
                        context.SaveChanges();
                        tran.Commit();
                    }

                    catch
                    {
                        
                        tran.Rollback();
                        context.Entry(entity).State = EntityState.Detached;
                        throw;
                    }
                }
            }

        }

        public virtual List<T> GetAll()
        {
            return context.Set<T>().ToList();
        }

        public virtual T GetById(int id)
        {
            return context.Set<T>().SingleOrDefault(a => a.Id == id);
        }
        public virtual void Add(T entity)
        {
            context.Set<T>().Add(entity);
            context.SaveChanges();
        }
        public virtual void Save(T entity)
        {
            var cindb = context.Set<T>().Find(entity.Id);
            if (cindb == null)
            {
                context.Set<T>().Add(entity);
                context.SaveChanges();
                return;

            }

            var entry = context.Entry(cindb);
            entry.State = EntityState.Modified;
            entry.CurrentValues.SetValues(entity);
            context.SaveChanges();
        }

    }
}
