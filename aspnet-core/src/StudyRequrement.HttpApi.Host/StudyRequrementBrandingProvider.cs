using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace StudyRequrement
{
    [Dependency(ReplaceServices = true)]
    public class StudyRequrementBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "StudyRequrement";
    }
}
