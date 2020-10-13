import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/*
  const render(element, container)
  -> element: <App/>
  -> container: <element id="root">
*/
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
