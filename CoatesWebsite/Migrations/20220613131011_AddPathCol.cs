using Microsoft.EntityFrameworkCore.Migrations;

namespace CoatesWebsite.Migrations
{
    public partial class AddPathCol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "Pictures",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PictureUpdateVm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    PictureCategory = table.Column<int>(type: "INTEGER", nullable: false),
                    ProjectName = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PictureUpdateVm", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PictureUpdateVm");

            migrationBuilder.DropColumn(
                name: "Path",
                table: "Pictures");
        }
    }
}
