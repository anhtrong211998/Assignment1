using Microsoft.EntityFrameworkCore;
using StudyRequrement.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace StudyRequrement.Categories
{
    public class EfCoreCategoryRepository : EfCoreRepository<StudyRequrementDbContext, Category, Guid>,
            ICategoryRepository
    {
        public EfCoreCategoryRepository(
            IDbContextProvider<StudyRequrementDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }

        public async Task<Category> FindByCodeAsync(string code)
        {
            var dbSet = await GetDbSetAsync();
            return await dbSet.FirstOrDefaultAsync(c => c.Code == code);
        }

        public async Task<Category> GetLastCodeAsync(string code)
        {
            var dbSet = await GetDbSetAsync();
            return await dbSet.Where(c => c.Code.Contains(code)).OrderByDescending(c => c.Code).FirstOrDefaultAsync();
        }

        public async Task<List<Category>> GetListAsync(
            int skipCount,
            int maxResultCount,
            string sorting,
            string filter = null,
            string parentId = null)
        {
            var dbSet = await GetDbSetAsync();
            return await dbSet
                .WhereIf(
                    !filter.IsNullOrWhiteSpace(),
                    c => c.Code.Contains(filter) || c.ViName.Contains(filter) || c.EnName.Contains(filter)
                 )
                .WhereIf(
                    !parentId.IsNullOrWhiteSpace(),
                    c => c.ParentId.Equals(parentId)
                 )
                .OrderBy(sorting)
                .Skip(skipCount)
                .Take(maxResultCount)
                .ToListAsync();
        }

        public async Task<List<Category>> GetListParentAsync()
        {
            var dbSet = await GetDbSetAsync();
            return  await dbSet
                 //.Where(
                 //   c => c.ParentId == null
                 //)
                .ToListAsync();
        }
    }
}
