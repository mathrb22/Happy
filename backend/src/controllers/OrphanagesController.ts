import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";

//Exportando o objeto OrphanagesController:
export default {
	async index(request: Request, response: Response) {
		const orphanagesRepository = getRepository(Orphanage);

		const orphanages = await orphanagesRepository.find();

		return response.json(orphanages);
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

		const orphanage = orphanagesRepository.create({
			name,
			latitude,
			longitude,
			about,
			instructions,
			opening_hours,
			open_on_weekends,
		});

		await orphanagesRepository.save(orphanage);

		return response.status(201).json(orphanage);
	},
};