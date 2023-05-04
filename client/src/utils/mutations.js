import { gql } from '@apollo/client';

export const CREATE_USER = gql`
	mutation createUser($username: String!, $email: String!, $password: String!) {
		createUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			token
			user {
				_id
				username
				email
			}
		}
	}
`;
export const SAVE_BOOK = gql`
	mutation saveBook($userId: ID!, $bookData: BookInput!) {
		saveBook(userId: $userId, bookData: $bookData) {
			_id
			username
			email
			savedBooks {
				bookId
				authors
				image
				description
				title
				link
			}
		}
	}
`;

export const DELETE_BOOK = gql`
	mutation deleteBook($userId: ID!, $bookData: BookInput!) {
		deleteBook(userId: $userId, bookData: $bookData) {
			_id
			username
			savedBooks {
				authors
				description
				bookId
				image
				link
				title
			}
		}
	}
`;

