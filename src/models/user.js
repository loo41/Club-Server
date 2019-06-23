const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  @param {account} 账号
 *  @param {mail} 邮箱
 *  @param {access} 电话
 *  @param {head_thumb} 头像
 *  @param {blacklist} 设置黑名单，不允许申请权限，参与报名
 *  @param {date} 创建日期
 *  @author {TCYong}
 */

const UserSchema = new Schema({
  account: String,
  mail: {type: String, default: ''},
  phone: {type: String, default: ''},
  head_thumb: {type: String, default: ''},
  blacklist: {type: Boolean, default: false},
  date: {type: Date, default: Date.now}
});

const User = moogose.model('user', UserSchema)

module.exports = User