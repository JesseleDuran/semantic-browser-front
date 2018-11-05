import axios from "axios";

export const addLike = ({ data }) => {
	const form = new FormData();
	form.append("link", data.link);
	form.append("id-user", data["id-user"]);
	return axios({
		method: "post",
		url: "https://46976b51.ngrok.io/api/v1/favs",
		data: form,
		config: { headers: { "Content-Type": "multipart/form-data" } }
	}).then(res => res.data);
};

export const removeLike = likeId => {};

export const getLikes = userId => {
	return axios({
		method: "get",
		url: "https://46976b51.ngrok.io/api/v1/favs/all",
		params: {
			["id-user"]: userId
		}
	}).then(res => res.data);
};
