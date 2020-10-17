import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1602957772586 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		//Executar operações
		await queryRunner.createTable(
			new Table({
				name: "orphanages",
				columns: [
					{
						name: "id",
						type: "integer",
						unsigned: true, //Não pode ser negativo
						isPrimary: true, //Primary key
						isGenerated: true,
						generationStrategy: "increment",
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "latitude",
						type: "decimal",
						scale: 10, //Número total de dígitos
						precision: 2, //Casas decimais
					},
					{
						name: "longitude",
						type: "decimal",
						scale: 10, //Número total de dígitos
						precision: 2, //Casas decimais
					},
					{
						name: "about",
						type: "text",
					},
					{
						name: "instructions",
						type: "text",
					},
					{
						name: "open_on_weekends",
						type: "boolean",
						default: false,
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		//Desfazer o que foi executado pelo método UP
		await queryRunner.dropTable("orphanages");
	}
}
