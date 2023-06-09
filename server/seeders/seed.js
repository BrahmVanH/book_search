const db = require('../config/connection');
const { User, Book } = require('../models');
const userSeeds = require('./userSeeds.json');
// const bookSeeds = require('./bookSeeds.json');

db.once('open', async () => {
	try {
		await User.deleteMany({});
		// await Book.deleteMany({});

		await User.create(userSeeds);
		// await Book.create(bookSeeds);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}

	console.log('all done!');
	process.exit(0);
});
