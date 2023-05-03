const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Book {
		authors: String
		description: String
		bookId: String
		image: String
		link: String
		title: String
	}

	type User {
		_id: ID
		username: String!
		email: String!
		password: String!
		savedBooks: [Book]
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		book: [Book]
		user(username: String!): User
	}

	input BookInput {
		authors: [String]
		description: String!
		bookId: String!
		image: String
		link: String
		title: String!
	}

	type Mutation {
		createUser(username: String!, email: String!, password: String!): Auth
		loginUser(username: String, email: String, password: String!): Auth
		saveBook(bookData: BookInput!, userId: String!): User
		deleteBook(bookId: String!): User
	}
`;

module.exports = typeDefs;
