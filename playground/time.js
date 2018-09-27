// Jan 1st 1970 00:00:00 am  = 0
const moment = require('moment');

//var date = new Date();
//console.log(date.getMonth());

var date = moment(new Date);
//console.log(date.format('MMM Do, YYYY'));


console.log(date.format('MMM Do, YYYY hh:mm a'));