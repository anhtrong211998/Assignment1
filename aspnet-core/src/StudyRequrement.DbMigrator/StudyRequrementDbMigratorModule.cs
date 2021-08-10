using StudyRequrement.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace StudyRequrement.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(StudyRequrementEntityFrameworkCoreModule),
        typeof(StudyRequrementApplicationContractsModule)
        )]
    public class StudyRequrementDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
