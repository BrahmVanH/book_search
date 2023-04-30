import axios from 'axios';

const url = `/books/v1/volumes?q=${query}`;
const baseURL = 'https://www.googleapis.com';

const searchGoogleBooks = (query) => {
	axios.get(`${baseURL}${url}`);
};
