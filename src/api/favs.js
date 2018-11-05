import axios from "axios";

export const addLike = ({ data }) => {
	return axios({
            method: 'post',
            url: 'http://localhost:8080/api/v1/favs',
            data: data,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => res.data);
};
