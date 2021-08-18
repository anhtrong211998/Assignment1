using Microsoft.EntityFrameworkCore.Migrations;

namespace StudyRequrement.Migrations
{
    public partial class alter_categories_table_update_field : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "AppCategories");

            migrationBuilder.AddColumn<string>(
                name: "EnName",
                table: "AppCategories",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ViName",
                table: "AppCategories",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnName",
                table: "AppCategories");

            migrationBuilder.DropColumn(
                name: "ViName",
                table: "AppCategories");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AppCategories",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
        }
    }
}
