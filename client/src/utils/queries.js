import { gql } from '@apollo/client';
import client from '../App';

export const GET_ME = gql`
	query user($userId: ID!) {
		user(userId: $userId) {
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
			bookCount
		}
	}
`;
