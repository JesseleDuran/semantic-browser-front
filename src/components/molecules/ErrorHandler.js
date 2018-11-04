import React from "react";

const ErrorHandler = error => {
	return error.response ? (
		<p>{error.response.status}</p>
	) : (
		<p>Error de Conexion</p>
	);
};

export default ErrorHandler;
