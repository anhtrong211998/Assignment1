using Microsoft.EntityFrameworkCore.Migrations;

namespace StudyRequrement.Migrations
{
    public partial class Alter_Table_Categories_Add_Column_ParentId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ParentId",
                table: "AppCategories",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "AppCategories");
        }
    }
}
