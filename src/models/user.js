const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  @param {account} 账号
 *  @param {password} 密码
 *  @param {mail} 邮箱
 *  @param {access} 电话
 *  @param {head_thumb} 头像
 *  @param {blacklist} 设置黑名单，不允许登陆，参与报名
 *  @param {date} 创建日期
 *  @author {TCYong}
 */

const UserSchema = new Schema({
  account: String,
  password: String,
  mail: String,
  phone: String,
  head_thumb: String,
  blacklist: {type: Boolean, default: false},
  date: {type: Date, default: Date.now}
});

const User = moogose.model('user', UserSchema)

module.exports = User