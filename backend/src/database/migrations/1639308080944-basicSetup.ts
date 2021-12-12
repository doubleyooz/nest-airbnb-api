import {MigrationInterface, QueryRunner} from "typeorm";

export class basicSetup1639308080944 implements MigrationInterface {
    name = 'basicSetup1639308080944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "references" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "zipCode" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "gender" character varying NOT NULL, "governmentID" character varying, "phoneNumber" character varying NOT NULL, "emergencyContact" character varying, "nationality" character varying, "addressId" integer, "accountId" integer, CONSTRAINT "REL_14e847e346e37ff3da35078a6c" UNIQUE ("addressId"), CONSTRAINT "REL_36059b560e94dbaa061527a85c" UNIQUE ("accountId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "host" ("id" SERIAL NOT NULL, "placeType" integer NOT NULL, "description" integer NOT NULL, "privacy" integer NOT NULL, "guests" integer NOT NULL, "beds" integer NOT NULL, "bedrooms" integer, "bathrooms" integer NOT NULL, "privateBathrroms" boolean NOT NULL, "standoutAmenities" character varying array NOT NULL, "guestFavorites" character varying array NOT NULL, "safetyItems" character varying array NOT NULL, "photos" character varying array NOT NULL, "title" character varying NOT NULL, "highlights" character varying array NOT NULL, "descriptionText" character varying NOT NULL, "price" integer NOT NULL, "odds" boolean array NOT NULL, "addressId" integer, CONSTRAINT "REL_879682fc0e684dc7d7d8ff080e" UNIQUE ("addressId"), CONSTRAINT "PK_44424c24c2f9b1d7bbf8721f4c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "tokenVersion" integer NOT NULL DEFAULT '1', "profileIDId" integer, "hostIDId" integer, CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "REL_7a6053fb7984753404736a2fc6" UNIQUE ("profileIDId"), CONSTRAINT "REL_54c4d580837b3458c0451590bb" UNIQUE ("hostIDId"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4c8f96ccf523e9a3faefd5bdd4" ON "account" ("email") `);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_14e847e346e37ff3da35078a6c8" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_36059b560e94dbaa061527a85ce" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "host" ADD CONSTRAINT "FK_879682fc0e684dc7d7d8ff080e9" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_7a6053fb7984753404736a2fc65" FOREIGN KEY ("profileIDId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_54c4d580837b3458c0451590bb4" FOREIGN KEY ("hostIDId") REFERENCES "host"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_54c4d580837b3458c0451590bb4"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_7a6053fb7984753404736a2fc65"`);
        await queryRunner.query(`ALTER TABLE "host" DROP CONSTRAINT "FK_879682fc0e684dc7d7d8ff080e9"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_36059b560e94dbaa061527a85ce"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_14e847e346e37ff3da35078a6c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4c8f96ccf523e9a3faefd5bdd4"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "host"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
