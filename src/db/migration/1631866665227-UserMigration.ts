import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1631866665227 implements MigrationInterface {
    name = 'UserMigration1631866665227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` ADD \`heroic_user_uuid\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wordpress\`.\`users\` DROP COLUMN \`heroic_user_uuid\``);
    }

}
