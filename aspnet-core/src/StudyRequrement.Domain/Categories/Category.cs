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

        public string Name { get; set; }

        private Category()
        {
        }

        internal Category(
            Guid id,
            [NotNull] string code,
            [NotNull] string name)
            : base(id)
        {
            SetCode(code);
            SetName(name);
        }

        private void SetName([NotNull] string name)
        {
            Name = Check.NotNullOrWhiteSpace(
                name,
                nameof(name),
                maxLength: 255
            );
        }

        private void SetCode([NotNull] string code)
        {
            Code = Check.NotNullOrWhiteSpace(
                code,
                nameof(code),
                maxLength: 100
            );
        }
    }
}
