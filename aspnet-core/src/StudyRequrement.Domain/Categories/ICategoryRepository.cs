using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace StudyRequrement.Categories
{
    public interface ICategoryRepository : IRepository<Category, Guid>
    {
        Task<Category> FindByCodeAsync(string code);

        Task<Category> GetLastCodeAsync(string code);

        Task<List<Category>> GetListAsync(
            int skipCount,
            int maxResultCount,
            string sorting,
            string filter = null,
            string parentId = null
        );

        Task<List<Category>> GetListParentAsync();
    }
}
