using Microsoft.EntityFrameworkCore.Migrations;

namespace VolsREs.Data.Migrations
{
    public partial class fin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReservationID",
                table: "Flight");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReservationID",
                table: "Flight",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
