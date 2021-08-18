using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace StudyRequrement.Categories
{
    public class Category : AuditedAggregateRoot<Guid>
    {
        public string Code { get; set; }

        public string ViName { get; set; }

        public string EnName { get; set; }

        public string ParentId { get; set; }

        private Category()
        {
        }

        internal Category(
            Guid id,
            [NotNull] string code,
            [CanBeNull] string viName,
            [CanBeNull] string enName,
            [CanBeNull] string parentId = null)
            : base(id)
        {
            SetCode(code);
            //SetViName(viName);
            //SetEnName(enName);
            ViName = viName;
            EnName = enName;
            ParentId = parentId;
        }

        //private void SetViName([CanBeNull] string name)
        //{
        //    ViName = Check.NotNullOrWhiteSpace(
        //        name,
        //        nameof(name),
        //        maxLength: 255
        //    );
        //}

        //private void SetEnName([CanBeNull] string name)
        //{
        //    EnName = Check.Length(
        //        name,
        //        nameof(name),
        //        maxLength: 255
        //    );
        //}
        private void SetCode([CanBeNull] string code)
        {
            Code = Check.NotNullOrWhiteSpace(
                code,
                nameof(code),
                maxLength: 100
            );
        }
    }
}
