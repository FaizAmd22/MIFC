import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigrations1735620497651 implements MigrationInterface {
    name = 'MyMigrations1735620497651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shape" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "canvasId" integer, CONSTRAINT "PK_791a8ab0283a51b881bdf252a56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "canvas" ("id" SERIAL NOT NULL, "fileName" character varying NOT NULL, CONSTRAINT "PK_0f87c183b39aec0e115707e10a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "connection" ("id" SERIAL NOT NULL, "color" character varying NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "canvasId" integer, CONSTRAINT "PK_be611ce8b8cf439091c82a334b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sensor_data" ("id" SERIAL NOT NULL, "location" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_1c0b5610a1a0f690d40239d408d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shape" ADD CONSTRAINT "FK_937ff385d9a8ec8ea864fd39d5f" FOREIGN KEY ("canvasId") REFERENCES "canvas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_13a67a49dce09f8c246ca419d89" FOREIGN KEY ("canvasId") REFERENCES "canvas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_13a67a49dce09f8c246ca419d89"`);
        await queryRunner.query(`ALTER TABLE "shape" DROP CONSTRAINT "FK_937ff385d9a8ec8ea864fd39d5f"`);
        await queryRunner.query(`DROP TABLE "sensor_data"`);
        await queryRunner.query(`DROP TABLE "connection"`);
        await queryRunner.query(`DROP TABLE "canvas"`);
        await queryRunner.query(`DROP TABLE "shape"`);
    }

}
