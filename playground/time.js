const moment =require('moment');

var date = moment(new Date().getTime());

console.log(date.format('lll'));
