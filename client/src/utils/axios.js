import axios from 'axios';

const url = `/books/v1/volumes?q=`;
const baseURL = 'https://www.googleapis.com';

export const searchGoogleBooks = async (query) => {
	console.log('making axios get request...');
	const request = await axios.get(`${baseURL}${url}${query}`);
	console.log(request);

	return request 
};
