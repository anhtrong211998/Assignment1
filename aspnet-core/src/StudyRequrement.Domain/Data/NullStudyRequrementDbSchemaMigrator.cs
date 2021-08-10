using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace StudyRequrement.Data
{
    /* This is used if database provider does't define
     * IStudyRequrementDbSchemaMigrator implementation.
     */
    public class NullStudyRequrementDbSchemaMigrator : IStudyRequrementDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}