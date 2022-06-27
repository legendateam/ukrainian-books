import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1656345347327 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
           CREATE TABLE Users(
           ID  SERIAL PRIMARY KEY,
           NAME           TEXT      NOT NULL,
           AGE            INT       NOT NULL,
           ADDRESS        CHAR(50),
           SALARY         REAL
           )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS USERS
        `);
    }
}
