const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  @param {account} 账号
 *  @param {password} 密码
 *  @param {clubName} 社团名称
 *  @param {access} 管理员权限
 *  @param {visits} 访问次数
 *  @param {head_thumb} 头像
 *  @param {date} 创建日期
 *  @author {TCYong}
 */

const AdminSchema = new Schema({
  account: String,
  password: String,
  clubName: String,
  access: Array,
  visits: {type: Number, default: 0},
  head_thumb: String,
  star: {type: Boolean, default: false},
  sort: {type: Number, default: 1, index: true},
  date: {type: Date, default: Date.now}
});

const Admin = moogose.model('admin', AdminSchema)

module.exports = Admin