using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StudyRequrement.Data;
using Volo.Abp.DependencyInjection;

namespace StudyRequrement.EntityFrameworkCore
{
    public class EntityFrameworkCoreStudyRequrementDbSchemaMigrator
        : IStudyRequrementDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreStudyRequrementDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the StudyRequrementDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<StudyRequrementDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
