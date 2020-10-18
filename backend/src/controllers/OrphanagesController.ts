import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";

//Exportando o objeto OrphanagesController:
export default {
	async index(request: Request, response: Response) {
		//Declarando o repositório do tipo Orphanage:
		const orphanagesRepository = getRepository(Orphanage);

		//Declarando a constante orphanages que irá receber do método find() um array de entidades (orphanages):
		const orphanages = await orphanagesRepository.find();

		return response.json(orphanages);
	},

	async show(request: Request, response: Response) {
		//Recebendo o parâmetro id da rota (route param):
		const { id } = request.params;

		const orphanagesRepository = getRepository(Orphanage);

		const orphanage = await orphanagesRepository.findOneOrFail(id);

		return response.json(orphanage);
	},

	async create(request: Request, response: Response) {
		//Desestruturando o corpo da requisição:
		const {
			name,
			latitude,
			longitude,
			about,
			instructions,
			opening_hours,
			open_on_weekends,
		} = request.body;

		const orphanagesRepository = getRepository(Orphanage);

		//Declarando a constante requestImages, atribuindo à ela o array de arquivos:
		const requestImages = request.files as Express.Multer.File[];
		//as Express.Multer.File[] -> determina que request.files é um array de arquivos

		//Mapeando o array de imagens, retornando o path (filename) da imagem, que será adicionado na tabela images pelo método create;
		const images = requestImages.map((image) => {
			return { path: image.filename };
		});

		const orphanage = orphanagesRepository.create({
			name,
			latitude,
			longitude,
			about,
			instructions,
			opening_hours,
			open_on_weekends,
			images,
		});

		await orphanagesRepository.save(orphanage);

		return response.status(201).json(orphanage);
	},
};
