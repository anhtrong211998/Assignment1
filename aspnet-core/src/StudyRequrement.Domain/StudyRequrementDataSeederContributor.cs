using StudyRequrement.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace StudyRequrement
{
    public class StudyRequrementDataSeederContributor : IDataSeedContributor, ITransientDependency
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly CategoryManager _categoryManager;

        public StudyRequrementDataSeederContributor(ICategoryRepository categoryRepository, CategoryManager categoryManager)
        {
            _categoryRepository = categoryRepository;
            _categoryManager = categoryManager;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            if (await _categoryRepository.GetCountAsync() <= 0)
            {
                await _categoryRepository.InsertAsync(
                    await _categoryManager.CreateAsync(
                        "DODONG_TRAU_BO_CAN",
                        "Trâu-bò cân hàng"
                    )
                );

                await _categoryRepository.InsertAsync(
                    await _categoryManager.CreateAsync(
                        "DODONG_TRAU_BO",
                         "Trâu-bò"
                    )                    
                );

                await _categoryRepository.InsertAsync(
                    await _categoryManager.CreateAsync(
                        "DOVIEN_THO_PHAT",
                        "Thọ phát"
                    )
                );

                await _categoryRepository.InsertAsync(
                    await _categoryManager.CreateAsync(
                        "DOVIEN_THANH_DAT",
                        "Thành đạt"
                    )
                );
            }
        }
    }
}
