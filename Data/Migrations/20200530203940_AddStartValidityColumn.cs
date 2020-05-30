using Microsoft.EntityFrameworkCore.Migrations;

namespace QRKey.Data.Migrations
{
    public partial class AddStartValidityColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "StartValidity",
                table: "QRCodes",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartValidity",
                table: "QRCodes");
        }
    }
}
