import axios from "axios";

const GOOGLE_URL = "https://www.googleapis.com/customsearch/v1";
const GOOGLE_KEY = "AIzaSyDknn9H0orATNQTG8cmeWn7xtTHUbyx0XE";
const GOOGLE_CX = "004019056823071446092:rmosvkn-cfa";
const GOOGLE_LANGUAGUE = "es";

const createGoogleRequester = () => {
	const request = axios.create({ baseURL: GOOGLE_URL });
	return request;
};

export const search = ({ q = "", start = 1, num = 2, searchType = null }) => {
	return createGoogleRequester()
		.get("/", {
			params: {
				q,
				start,
				num,
				safe: "active",
				key: GOOGLE_KEY,
				hq: "IT, Programming",
				cx: GOOGLE_CX,
				hl: GOOGLE_LANGUAGUE,
				searchType
			}
		})
		.then(res => res.data);
};
