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
	mutation saveBook($bookId: String!) {
		saveBook(bookId: $bookId) {
			user {
				username
				bookCount
				savedBooks {
					book {
						title
					}
				}
			}
		}
	}
`;

export const DELETE_BOOK = gql`
	mutation deleteBook($bookId: String!) {
		deleteBook(bookId: $bookId) {
			user {
				username
				savedBooks {
					book {
						authors
						description
						bookId
						image
						link
						title
					}
				}
			}
		}
	}
`;
// export const saveBook = (bookId, token) => {
// 	return client.mutation({
// 		mutation: SAVE_BOOK,
// 		variables: { bookId },
// 		context: {
// 			headers: {
// 				authorization: `Bearer ${token}`,
// 			},
// 		},
// 	});
// };

// export const deleteBook = (bookId, token) => {
// 	return client.mutation({
// 		mutation: DELETE_BOOK,
// 		variables: { bookId },
// 		context: {
// 			headers: {
// 				authorization: `Bearer ${token}`,
// 			},
// 		},
// 	});
// };
