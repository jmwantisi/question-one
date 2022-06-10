import dotenv from "dotenv"
dotenv.config();

const db = {
	client: process.env.CLIENT,
	connection: {
		port: process.env.BD_PORT,
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
	}
};

const knex = require('knex')(db);

const all = async (req, res, next) => {
	knex.select('*').from('books')
        .where({ void: 0 })
		.then(data => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						data
					});
				},
			})
		})
}

const findById = async (id) => {
	return knex.select('*').from('books')
        .where({ void: 0 })
}

const getBook = async (req, res, next) => {
	const id = req.params.id
	const data = await findById(id)
	res.format({
		'application/json': function () {
			return res.status(200).json({
				data
			});
		},
	})
}

const create = async (req, res, next) => {
    console.log(req.body)
	const { name, description, author_id } = req.body
	knex('books').insert({ name, description, author_id, created_at: new Date() })
		.then(async id => {
			const data = await findById(id[0])
			res.format({
				'application/json': function () {
					return res.status(201).json({
						message: `Book created`,
						data
					});
				},
			})
		})
}

const remove = async (req, res, next) => {
	const id = req.params.id
	knex('books')
		.where({ id })
		.update({ void: 1 })
		.then(data => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Book was deleted'
					});
				},
			})
		})
}

const update = async (req, res, next) => {
	const id = req.params.id
	const { name, description, } = req.body
	knex('books')
		.where({ id: parseInt(id) })
		.update({ name, description, updated_at: new Date() })
		.then(async data => {
			const updated = await findById(id)
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Book updated',
						event: updated
					});
				},
			})
		})
}

module.exports = {
	all,
	create,
	remove,
	update,
	getBook
}