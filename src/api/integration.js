import request from "./request";
import { normalize } from "normalizr";
import { integrationSchema } from "schemas/integration";

export const getIntegrations = () => {
	return request().get("/restaurants-integrations-admin/integrations");
};

export const postIntegration = data => {
	return request()
		.post("/restaurants-integrations-admin/integrations", data)
		.then(res => {
			return res;
		});
};
