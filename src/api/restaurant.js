import _ from "lodash";
import request from "./request";

export const postItem = data => {
	return request().post("/restaurants-integrations-admin/items", data);
};

export const getItems = store => {
	return request()
		.get("/restaurants-integrations-admin/items", {
			params: { store }
		})
		.then(res => {
			return _.uniqBy(res.data, item => item.sku);
		});
};

export const putItems = items => {
	return request().put("/restaurants-integrations-admin/items", items);
};
