import { gql } from '@apollo/client';

const GET_ME = gql`
  query user(username: ID!) {
    username
    email
    password
  }
`;

export const getMe = (token) => {
	return client.query({
		query: GET_ME,
		context: {
			headers: {
				authorization: `Bearer ${token}`,
			},
		},
	});
};
