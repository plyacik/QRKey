using Microsoft.EntityFrameworkCore.Migrations;

namespace QRKey.Data.Migrations
{
    public partial class AddIsGuestColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsGuest",
                table: "QRCodes",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsGuest",
                table: "QRCodes");
        }
    }
}
