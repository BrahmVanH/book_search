import axios from 'axios';

const url = `/books/v1/volumes?q=`;
const baseURL = 'https://www.googleapis.com';

export const searchGoogleBooks = async (query) => {
	const request = await axios.get(`${baseURL}${url}${query}`);

	return request;
};
