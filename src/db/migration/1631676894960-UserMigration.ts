import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1631676894960 implements MigrationInterface {
    name = 'UserMigration1631676894960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` ADD \`nonce\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` ADD \`publicAddress\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` ADD UNIQUE INDEX \`IDX_55bd16add628bc4474b19f59c5\` (\`publicAddress\`)`);
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` ADD \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` ADD UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\``);
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` DROP INDEX \`IDX_55bd16add628bc4474b19f59c5\``);
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` DROP COLUMN \`publicAddress\``);
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` DROP COLUMN \`nonce\``);
    }

}
