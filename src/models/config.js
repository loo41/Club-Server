const moogose = require('mongoose');
const moment = require('moment');
const Schema = moogose.Schema;


/**
 *  
 *  @param {notice} 公告 {isOpen: 是否开启，content：公告内容}
 *  @param {banner} Banner图展示 是否开启
 *  @param {signUp} 报名是否开启
 *  @param {leavingMessage} 留言是否开启
 *  @param {corporation_id} 对应的社团 _id
 * 
 */


const configSchema = new Schema({
  corporation_id: {type: Schema.Types.ObjectId, ref: 'admin', index: true},
  notice: {type: Object, default: {isOpen: true, content: ''}},
  banner: {type: Boolean, default: true},
  signUp: {type: Boolean, default: true},
  leavingMessage: {type: Boolean, default: true}
})

const Config = moogose.model('config', configSchema)

module.exports = Config