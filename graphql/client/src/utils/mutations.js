import { gql } from '@apollo/client';
import client from './client';

export const CREATE_USER = gql`
  mutation createUser(username: String!, email: String!, password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser(email: String!, password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`
const SAVE_BOOK = gql`
  mutation saveBook(bookId: String!) {
    saveBook(bookId: $bookId) {
      user {
        username
        savedBooks {
          book {
            title
          }
        }
      }
    }
  }
`

export const saveBook = (bookData, token) => {
  return client.mutation({
    mutation: SAVE_BOOK,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
};

