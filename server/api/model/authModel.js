//=================================================================================================
var config = require('../../global/config');
var crypto_function = require('../../global/crypto_function');
var moment = require('moment');

function model() {
	//================================================================================================
	this.login = function (data) {
		return new Promise((resolve, reject) => {
			var sql = " select users_name,\n" +
				"users_address,\n" +
				"users_city,\n" +
				"users_region,\n" +
				"users_email,\n" +
				"users_tel,\n" +
				"branch_name,\n" +
				"usergroup_name,\n" +
				"tb_users.usergroup_id,\n" +
				"tb_users.branch_id\n" +
				" from tb_users \n" +
				"INNER JOIN tb_branches on tb_users.branch_id = tb_branches.branch_id\n" +
				"INNER JOIN tb_usergroup on tb_users.usergroup_id = tb_usergroup.usergroup_id where username =  '" + data.username + "' AND password = '" + data.password + "'";
			// console.log(sql);
			config.pool.query(sql, [], function (err, result) {
				if (err) {
					console.log(err);
					console.log(result);
					console.log(sql);
					output = [{
						accessToken: '',
						userData: result.rows
					}];
					resolve(output);
				} else {
					var output;
					var token = '';
					if (result.rows.length > 0) {
						var dataTime = moment().format("YYYY-MM-DD HH:mm:ss");

						var strToken = data.username + "|" + data.password + "|" + ' ' + "|" + dataTime + "|" + result.rows[0].employees_id + "|" + result.rows[0].job_position + "|" + result.rows[0].branch_id;
						token = crypto_function.encrypt(strToken);
						output = [{
							accessToken: token,
							userData: result.rows
						}];
					} else {
						output = [{
							accessToken: '',
							userData: result.rows
						}];
					}
					// console.log({
					// 	accessToken: token,
					// 	userData: result.rows
					// });
					resolve(output);
				}

			});

		});
	};

	this.save = function (data) {
		return new Promise((resolve, reject) => {
			var sql = `INSERT INTO tb_users (
				users_name,
				users_email,
				username,
				password,
				usergroup_id,
				branch_id)
						VALUES(
							'` + data.users_name + `',
							'` + data.users_email + `',
							'` + data.username + `',
							'` + data.password + `',
							 1,1 )`;
			// console.log(sql)
			config.pool.query(sql, [], function (err, result) {
				let output;
				if (err) {
					output = [{
						isRegister: false
					}];
				} else {
					output = [{
						isRegister: true
					}];
				}

				resolve(output);
			});
		});
	};
	//================================================================================================
	this.checkLogin = function (data) {
		return new Promise((resolve, reject) => {
			var tokenData = crypto_function.getTokenData(data.authorization)
			var output;
			var datetime = moment(tokenData.datetime).add(24, 'hour').format("YYYY-MM-DD HH:mm:ss");
			var nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
			if (datetime <= nowDate) {
				output = [{
					isToken: false
				}];
			} else {
				output = [{
					isToken: true
				}];
			}
			// console.log(output)
			resolve(output);
		});
	};

	this.checkUsername = function (data) {
		return new Promise((resolve, reject) => {
			var sql = "SELECT username\n" +
				" from tb_users \n" +
				" where username =  '" + data.username + "'";
			config.pool.query(sql, [], function (err, result) {
				var output;
				if (err) {
					console.log(err);
					console.log(result);
					console.log(sql);
					output = false;
				} else {
					if (result.rows.length > 0) {
						output = false;
					} else {
						output = true;
					}
				}
				resolve(output);
			});
		});
	};



}
module.exports = new model();