using Volo.Abp.Modularity;

namespace StudyRequrement
{
    [DependsOn(
        typeof(StudyRequrementApplicationModule),
        typeof(StudyRequrementDomainTestModule)
        )]
    public class StudyRequrementApplicationTestModule : AbpModule
    {

    }
}