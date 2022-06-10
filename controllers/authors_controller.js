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
	knex.select('*').from('authors')
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
	return knex.select('*').from('authors')
        .where({ void: 0 })
}

const getAuthor = async (req, res, next) => {
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
	const { first_name, last_name } = req.body
	knex('authors').insert({ first_name, last_name, created_at: new Date() })
		.then(async id => {
			const data = await findById(id)
			res.format({
				'application/json': function () {
					return res.status(201).json({
						message: `Author created`,
						data
					});
				},
			})
		})
}

const remove = async (req, res, next) => {
	const id = req.params.id
	knex('authors')
		.where({ id })
		.update({ void: 1 })
		.then(data => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Author was deleted'
					});
				},
			})
		})
}

const update = async (req, res, next) => {
	const id = req.params.id
	const { first_name, last_name } = req.body
	knex('authors')
		.where({ id: parseInt(id) })
		.update({ first_name, last_name , updated_at: new Date() })
		.then(async data => {
			const updated = await findById(id)
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Author updated',
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
	getAuthor
}