using StudyRequrement.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace StudyRequrement.Permissions
{
    public class StudyRequrementPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(StudyRequrementPermissions.GroupName);

            //Define your own permissions here. Example:
            //myGroup.AddPermission(StudyRequrementPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<StudyRequrementResource>(name);
        }
    }
}
