const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  @param {user_id} 用户
 *  @param {admin_id} 社团
 *  @param {content} 内容
 *  @param {date} 时间
 */

const MessageSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'user'},
  admin_id: {type: Schema.Types.ObjectId, ref: 'admin', index: true},
  content: String,
  date: {type: Date, default: Date.now},
});

const Message = moogose.model('message', MessageSchema)

module.exports = Message