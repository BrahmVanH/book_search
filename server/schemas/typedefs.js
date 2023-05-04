const { gql } = require('apollo-server-express');


// Type definitions for all application data
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

	input BookInput {
		authors: [String]
		description: String
		bookId: ID!
		image: String
		link: String
		title: String
	}

	type Query {
		user(userId: ID!): User
	}

	type Mutation {
		createUser(username: String!, email: String!, password: String!): Auth
		loginUser(email: String!, password: String!): Auth
		saveBook(userId: ID!, bookData: BookInput!): User
		deleteBook(userId: ID!, bookData: BookInput!): User
	}
`;

module.exports = typeDefs;
