import { gql } from '@apollo/client';
import client from '../App';

export const GET_ME = gql`
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


