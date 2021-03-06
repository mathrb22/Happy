import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import orphanageView from "../views/orphanages_view";
import * as Yup from "yup";

//Exportando o objeto OrphanagesController:
export default {
	async index(request: Request, response: Response) {
		//Declarando o repositório do tipo Orphanage:
		const orphanagesRepository = getRepository(Orphanage);

		//Declarando a constante orphanages que irá receber do método find() um array de entidades (orphanages), e a relação com a entidade "images":
		const orphanages = await orphanagesRepository.find({
			relations: ["images"],
		});

		return response.json(orphanageView.renderMany(orphanages));
	},

	async show(request: Request, response: Response) {
		//Recebendo o parâmetro id da rota (route param):
		const { id } = request.params;

		//Declarando o repositório do tipo Orphanage:
		const orphanagesRepository = getRepository(Orphanage);

		const orphanage = await orphanagesRepository.findOneOrFail(id, {
			relations: ["images"],
		});

		return response.json(orphanageView.render(orphanage));
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

		const data = {
			name,
			latitude,
			longitude,
			about,
			instructions,
			opening_hours,
			open_on_weekends,
			images,
		};

		const schema = Yup.object().shape({
			//Definindo os campos necessários para a criação de um orfanato:
			name: Yup.string().required(),
			latitude: Yup.number().required(),
			longitude: Yup.number().required(),
			about: Yup.string().required().max(300),
			instructions: Yup.string().required(),
			opening_hours: Yup.string().required(),
			open_on_weekends: Yup.boolean().required(),
			images: Yup.array(
				Yup.object().shape({
					path: Yup.string().required(),
				})
			),
		});

		await schema.validate(data, {
			abortEarly: false,
		});

		const orphanage = orphanagesRepository.create(data);

		await orphanagesRepository.save(orphanage);

		return response.status(201).json(orphanage);
	},
};
