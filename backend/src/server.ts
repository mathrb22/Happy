import express from "express";

import "./database/connection";

const app = express();

app.get("/users", (request, response) => {
	// return response.send("Hello World");
	return response.json({ message: "Hello World" });
});

app.listen(3333);
