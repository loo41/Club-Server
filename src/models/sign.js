const moogose = require('mongoose');
const moment = require('moment');
const Schema = moogose.Schema;


const SignSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'user'},
  admin_id: {type: Schema.Types.ObjectId, ref: 'admin', index: true},
  date: {type: Date, default: Date.now},
})

SignSchema.path('date').get(function (v) {
  return moment(v).format("YYYY-MM-DD HH:mm:ss");
})

const Sign = moogose.model('sign', SignSchema)

module.exports = Sign