// BE SURE TO ADD VALIDATION EXPRESSION FOR EMAIL ADDRESS HERE
// Replacing routers and controllers:

// User controllers:
// getSingleUser  '/me'
// createUser '/'
// login '/'
// saveBook '/'
// deleteBook '/books/:bookId'

const { Book, User } = require('../models');

const resolvers = {
	Query: {
		getSingleUser: async ({ user = null, params }, res) => {
			const foundUser = await User.findOne({
				$or: [
					{ _id: user ? user._id : params.id },
					{ username: params.username },
				],
			});

			if (!foundUser) {
				return res
					.status(400)
					.json({ message: 'Cannot find a user with this id!' });
			}

			return foundUser;
		},
    createUser: ({ body }, res) => {
      const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    return { token, user };
    }
	},
  
};
