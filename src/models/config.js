const moogose = require('mongoose');
const moment = require('moment');
const Schema = moogose.Schema;


/**
 *  
 *  @param {notice} 公告 {isOpen: 是否开启，content：公告内容}
 *  @param {banner} Banner图展示 {isOpen: 是否开启}
 *  @param {admin_id} 对应的 admin 人员
 * 
 */


const configSchema = new Schema({
  notice: Object,
  banner: Object,
  admin_id: {type: Schema.Types.ObjectId, ref: 'admin', index: true},
})

configSchema.path('date').get(function (v) {
  return moment(v).format("YYYY-MM-DD HH:mm:ss");
})

const Config = moogose.model('config', configSchema)

module.exports = Config