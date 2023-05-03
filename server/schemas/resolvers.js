// BE SURE TO ADD VALIDATION EXPRESSION FOR EMAIL ADDRESS HERE
// Replacing routers and controllers:

// User controllers:
// getSingleUser  '/me'
// createUser '/'
// login '/'
// saveBook '/'
// deleteBook '/books/:bookId'
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		user: async (_, { id, username }) => {
			const foundUser = await User.findOne({
				$or: [{ _id: id }, { username: username }],
			});

			if (!foundUser) {
				throw new Error('Cannot find user with that ID!');
			}

			return foundUser;
		},
	},
	Mutation: {
		createUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });

			const token = signToken(user);
			return { token, user };
		},

		loginUser: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('No user found with that email!');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);
			return { token, user };
		},

		saveBook: async (parent, { bookData }, { user }) => {
			if (user) {
				console.log({ user })
				const updatedUser = await User.findOneAndUpdate(
					{ _id: user._id },
					{ $addToSet: { savedBooks: bookData } },
					{ new: true, runValidators: true }
				);
				console.log(updatedUser);
				return updatedUser;
			} 
			throw new AuthenticationError('You need to be logged in to save a book!');
		},

		deleteBook: async (parent, { user, bookId }) => {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: user._id },
				{ $pull: { savedBooks: { bookId: bookId } } },
				{ new: true }
			);
			if (!updatedUser) {
				throw new Error("Can't find user with that ID!");
			}
			return updatedUser;
		},
	},
};

module.exports = resolvers;
