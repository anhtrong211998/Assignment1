using StudyRequrement.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace StudyRequrement
{
    [DependsOn(
        typeof(StudyRequrementEntityFrameworkCoreTestModule)
        )]
    public class StudyRequrementDomainTestModule : AbpModule
    {

    }
}