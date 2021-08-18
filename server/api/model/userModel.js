//=================================================================================================
var config = require('../../global/config');


function model() {
	//================================================================================================
	this.get = function () {
		return new Promise((resolve, reject) => {
			var sql = `select * from tb_users `;
			config.pool.query(sql, [], function (err, result) {
				console.log(result.rows);
				resolve(result.rows);
			});

		});
	};

	//================================================================================================
	this.getById = function (data) {
		return new Promise((resolve, reject) => {
			var sql = `select
							*
						from
						tb_users
						where
						users_id = '` + data.id + `' `;
			console.log(sql)
			config.pool.query(sql, [], function (err, result) {
				console.log(result.rows);
				resolve(result.rows);
			});
		});
	};
	this.getByName = function (data) {
		return new Promise((resolve, reject) => {
			var sql = `select
							*
						from
						tb_users
						where
						users_name = '` + data.name + `' `;
			config.pool.query(sql, [], function (err, result) {
				console.log(result.rows);
				resolve(result.rows);
			});
		});
	};
	this.save = function (data) {
		return new Promise((resolve, reject) => {
			var sql = `INSERT INTO tb_users (
							 name,
							 lat,
							 lng)
						VALUES(
							'` + data.name + `',
							'` + data.lat + `',
							'` + data.lng + `')`;

			config.pool.query(sql, [], function (err, result) {
				console.log(result.rows);
				resolve(result.rows);
			});
		});
	};
	this.update = function (data) {
		return new Promise((resolve, reject) => {
			var sql = `UPDATE
						location
					SET
							name ='` + data.name + `',
							lat ='` + data.lat + `',
							lng ='` + data.lng + `'
					where
							id ='` + data.id + `'`;


			config.pool.query(sql, [], function (err, result) {
				console.log(result.rows);
				resolve(result.rows);
			});
		});

	};

	this.delete = function (data) {
		return new Promise((resolve, reject) => {
			var sql = `DELETE FROM
							location
					   where
							id = '` + data.id + `'`;

			config.pool.query(sql, [], function (err, result) {
				console.log(result.rows);
				resolve(result.rows);
			});
		});
	};
}
module.exports = new model();