using Microsoft.EntityFrameworkCore.Migrations;

namespace CoatesWebsite.Migrations
{
    public partial class removepictureupdatevmtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PictureUpdateVm");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
