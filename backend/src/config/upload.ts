import multer from "multer";
//Importando a namespace path do Node.js:
import path from "path";

export default {
	storage: multer.diskStorage({
		//Definindo o diretório de destino de armazenagem das imagens:
		//__dirname -> diretório atual deste arquivo
		destination: path.join(__dirname, "..", "..", "uploads"),
		//Função para dar um nome ao arquivo:
		filename: (request, file, cb) => {
			//Para evitar duplicidade de imagens no upload, o nome do arquivo será composto pela data atual e o nome original do arquivo no computador do usuário que realizou o upload
			const fileName = `${Date.now()}-${file.originalname}`;
			//Função de callback:
			cb(null, fileName);
		},
	}),
};
