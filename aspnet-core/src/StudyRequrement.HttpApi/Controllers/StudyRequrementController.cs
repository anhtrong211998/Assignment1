using StudyRequrement.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace StudyRequrement.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class StudyRequrementController : AbpController
    {
        protected StudyRequrementController()
        {
            LocalizationResource = typeof(StudyRequrementResource);
        }
    }
}