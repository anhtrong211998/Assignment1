using System;
using System.Collections.Generic;
using System.Text;
using StudyRequrement.Localization;
using Volo.Abp.Application.Services;

namespace StudyRequrement
{
    /* Inherit your application services from this class.
     */
    public abstract class StudyRequrementAppService : ApplicationService
    {
        protected StudyRequrementAppService()
        {
            LocalizationResource = typeof(StudyRequrementResource);
        }
    }
}
