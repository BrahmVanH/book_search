const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Book {
		authors: [String]
		description: String
		bookId: ID!
		image: String
		link: String
		title: String
	}

	type User {
		_id: ID!
		username: String
		email: String
		password: String
		bookCount: Int
		savedBooks: [Book]
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		user(userId: ID!): User
	}

	input BookInput {
		authors: [String]
		description: String
		bookId: ID!
		image: String
		link: String
		title: String
	}

	type Mutation {
		createUser(username: String!, email: String!, password: String!): Auth
		loginUser(email: String!, password: String!): Auth
		saveBook(userId: ID!, bookData: BookInput!): User
		deleteBook(userID: ID!, bookData: BookInput!): User
	}
`;

module.exports = typeDefs;
