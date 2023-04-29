const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Book {
		authors: [String]
		description: String!
		bookId: String!
		image: String
		link: String
		title: String!
	}

	type User {
		_id: ID!
		username: String!
		email: String!
		password: String!
		savedBooks: [Book]
	}

	type Query {
		book: [Book]
		users(_id: ID!): [User]
	}

	type Mutation {
		createUser(username: String!, email: String!, password: String!): User
		signInUser(username: String, email: String, password: String): User
		saveBook(bookId: String!): User
		deleteBook(bookId: String!): User
	}
`;

module.exports = typeDefs;
