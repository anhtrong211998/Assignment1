using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace StudyRequrement.Categories
{
    public class CategoryAppService : StudyRequrementAppService, ICategoryAppService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly CategoryManager _categoryManager;

        public CategoryAppService(
            ICategoryRepository categoryRepository,
            CategoryManager categoryManager)
        {
            _categoryRepository = categoryRepository;
            _categoryManager = categoryManager;
        }

        //...SERVICE METHODS WILL COME HERE...
        public async Task<CategoryDto> GetAsync(Guid id)
        {
            var category = await _categoryRepository.GetAsync(id);
            return ObjectMapper.Map<Category, CategoryDto>(category);
        }

        public async Task<PagedResultDto<CategoryDto>> GetListAsync(GetCategoryListDto input)
        {
            if (input.Sorting.IsNullOrWhiteSpace())
            {
                input.Sorting = nameof(Category.Code);
            }

            var categories = await _categoryRepository.GetListAsync(
                input.SkipCount,
                input.MaxResultCount,
                input.Sorting,
                input.Filter,
                input.ParentId
            );

            var totalCount = input.Filter == null
                ? await _categoryRepository.CountAsync()
                : await _categoryRepository.CountAsync(
                    category => category.Code.Contains(input.Filter) || category.ViName.Contains(input.Filter) || category.EnName.Contains(input.Filter));

            return new PagedResultDto<CategoryDto>(
                totalCount,
                ObjectMapper.Map<List<Category>, List<CategoryDto>>(categories)
            );
        }

        public async Task<List<CategoryDto>> GetListParentAsync()
        {
            var query = await _categoryRepository.GetListParentAsync();
            return ObjectMapper.Map<List<Category>, List<CategoryDto>>(query); ;
        }
        public async Task<CategoryDto> CreateAsync(CreateUpdateCategoryDto input)
        {
            var category = await _categoryManager.CreateAsync(
                input.Code,
                input.ViName,
                input.EnName,
                input.ParentId
            );

            await _categoryRepository.InsertAsync(category);

            return ObjectMapper.Map<Category, CategoryDto>(category);
        }

        public async Task UpdateAsync(Guid id, CreateUpdateCategoryDto input)
        {
            var category = await _categoryRepository.GetAsync(id);
            category.Code = input.Code;
            category.ViName = input.ViName;
            category.EnName = input.EnName;
            await _categoryRepository.UpdateAsync(category);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _categoryRepository.DeleteAsync(id);
        }

        public async Task DeleteManyAsync(DeleteMutiCategoryDto request)
        {
            await _categoryRepository.DeleteManyAsync(request.Id);
        }

        public async Task<string> GetCodeGenerateAsync()
        {
            string date = String.Format("{0}{1}{2}",DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString(), DateTime.Now.Day.ToString());
            var category = await _categoryRepository.GetLastCodeAsync(date);
            int temp = 1;
            if (category != null)
            {
                { temp = Convert.ToInt16(category.Code.Substring(category.Code.ToString().Length - 4)) + 1; }
            }
            
            string genCode = temp.ToString();
            while (genCode.Length < 4) { genCode = string.Format("0{0}", genCode); }
            genCode = string.Format("CT{0}_{1}",date, genCode);
            return genCode;
        }
    }
}
