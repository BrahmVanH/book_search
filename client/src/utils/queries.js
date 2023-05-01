import { gql } from '@apollo/client';
import client from '../App';

const GET_ME = gql`
	query user($username: ID!) {
		me {
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

// export const getMe = (token) => {
// 	return client.query({
// 		query: GET_ME,
// 		context: {
// 			headers: {
// 				authorization: `Bearer ${token}`,
// 			},
// 		},
// 	});
// };
