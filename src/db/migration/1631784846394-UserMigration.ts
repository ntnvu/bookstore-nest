import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1631784846394 implements MigrationInterface {
    name = 'UserMigration1631784846394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` DROP COLUMN \`nonce\``);
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` ADD \`nonce\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` DROP COLUMN \`nonce\``);
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` ADD \`nonce\` int NOT NULL`);
    }

}
