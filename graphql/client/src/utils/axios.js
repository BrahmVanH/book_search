import axios from 'axios';

const url = `/books/v1/volumes?q=`;
const baseURL = 'https://www.googleapis.com';

export const searchGoogleBooks = (query) => {
	axios.get(`${baseURL}${url}${query}`);
};
