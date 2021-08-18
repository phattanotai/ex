var is_debug = true;
var moment = require('moment');
__debug = function(obj,connector){
	connection = connector || {id:'SYSTEM' , imei : 'SYSTEM'};
	object = obj || 'SYSTEM';
	if (is_debug !== true) return false;
	var date = moment().format("YYYY-MM-DD HH:mm:ss");
	console.log(date,"[",connection,"]-",object);
}
module.exports = __debug;
