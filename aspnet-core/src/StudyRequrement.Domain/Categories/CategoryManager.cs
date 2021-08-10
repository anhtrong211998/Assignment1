using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Services;

namespace StudyRequrement.Categories
{
    public class CategoryManager : DomainService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryManager(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<Category> CreateAsync(
            [NotNull] string code,
            [NotNull] string name)
        {
            Check.NotNullOrWhiteSpace(code, nameof(code));

            var existingAuthor = await _categoryRepository.FindByCodeAsync(code);
            if (existingAuthor != null)
            {
                throw new CategoryAlreadyExistsException(code);
            }

            return new Category(
                GuidGenerator.Create(),
                code,
                name
            );
        }
    }
}
