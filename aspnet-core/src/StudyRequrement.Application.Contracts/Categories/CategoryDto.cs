using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace StudyRequrement.Categories
{
    public class CategoryDto : AuditedEntityDto<Guid>
    {
        public string Code { get; set; }

        public string ViName { get; set; }

        public string EnName { get; set; }

        public string ParentId { get; set; }

    }
}
