using System.Threading.Tasks;

namespace StudyRequrement.Data
{
    public interface IStudyRequrementDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
