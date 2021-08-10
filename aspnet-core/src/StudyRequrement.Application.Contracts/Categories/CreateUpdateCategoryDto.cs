using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StudyRequrement.Categories
{
    public class CreateUpdateCategoryDto
    {
        [Required]
        [StringLength(100)]
        public string Code { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

    }
}
