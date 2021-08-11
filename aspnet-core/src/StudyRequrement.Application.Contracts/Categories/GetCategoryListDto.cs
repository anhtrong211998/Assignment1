using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace StudyRequrement.Categories
{
    public class GetCategoryListDto : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public string ParentId { get; set; }
    }
}
