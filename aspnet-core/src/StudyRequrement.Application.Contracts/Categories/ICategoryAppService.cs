using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace StudyRequrement.Categories
{
    public interface ICategoryAppService : IApplicationService
    {
        Task<CategoryDto> GetAsync(Guid id);

        Task<PagedResultDto<CategoryDto>> GetListAsync(GetCategoryListDto input);

        Task<List<CategoryDto>> GetListParentAsync();

        Task<CategoryDto> CreateAsync(CreateUpdateCategoryDto input);

        Task UpdateAsync(Guid id, CreateUpdateCategoryDto input);

        Task DeleteAsync(Guid id);

        Task DeleteManyAsync(DeleteMutiCategoryDto request);
    }
}
