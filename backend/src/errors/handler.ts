import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

//Definindo o tipo ValidationErrors como um array de objetos com chave do tipo string e um array de valore do tipo string:
interface ValidationErrors {
	[key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
	//Se ocorrer um erro de validação de dados:
	if (error instanceof ValidationError) {
		let errors: ValidationErrors = {};

		//Percorrendo cada um dos erros do array:
		error.inner.forEach((err) => {
			errors[err.path] = err.errors;
		});

		//Status code 400 -> Bad request
		return response.status(400).json({ message: "Validation fails", errors });
	}

	console.error(error);

	return response.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
