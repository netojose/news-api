import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateUsersTable1622418938914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          generationStrategy: "increment"
        },
        {
          name: "name",
          type: "varchar"
        },
        {
          name: "email",
          type: "varchar"
        },
        {
          name: "password",
          type: "varchar"
        }
      ]
    });
    await queryRunner.createTable(table);

    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: "IDX_USER_EMAIL",
        isUnique: true,
        columnNames: ["email"]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
