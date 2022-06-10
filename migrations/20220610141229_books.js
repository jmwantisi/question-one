
exports.up = function (knex) {
	return knex.schema.createTableIfNotExists('books', (books) => {
		books.increments();
        books.string('name');
        books.string('description');
        books.integer('void');
		books.integer('author_id').unsigned().notNullable();
		books.foreign('author_id').references('id').inTable('authors');
		books.timestamps();
	})
};

exports.down = function (knex) {
	return knex
		.schema
		.dropTableIfExists('books')
};