using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;

namespace StudyRequrement.Categories
{
    public class CategoryAlreadyExistsException : BusinessException
    {
        public CategoryAlreadyExistsException(string code)
            : base(StudyRequrementDomainErrorCodes.CategoryAlreadyExists)
        {
            WithData("code", code);
        }
    }
}
