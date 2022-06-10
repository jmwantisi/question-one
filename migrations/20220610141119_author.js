
exports.up = function (knex) {
	return knex.schema.createTableIfNotExists('authors', (authors) => {
		authors.increments();
		authors.string('first_name');
        authors.string('last_name');
        authors.integer('void');
		authors.timestamps();
	})
};

exports.down = function (knex) {
	return knex
		.schema
		.dropTableIfExists('author')
};
