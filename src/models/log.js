const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  @param {type} 日志类型 {1: 错误日志，2: 系统日志，3：信息日志}
 *  @param {des} 日志描述
 *  @param {date} 创建日期
 *  @author {TCYong}
 */

const LogSchema = new Schema({
  date: {type: Date, default: Date.now},
  type: Number,
  des: String,
});

LogSchema.path('date').get(function (v) {
  return moment(v).format("YYYY-MM-DD HH:mm:ss");
})

const Log = moogose.model('log', LogSchema)

module.exports = Log