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

		saveBook: async (parent, { user, bookId }) => {
			const updatedUser = await User.findOneAndUpdate(
				{ user: user._id },
				{ $addToSet: { savedBooks: bookId } },
				{ new: true, runValidators: true }
			);
			return updatedUser;
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
