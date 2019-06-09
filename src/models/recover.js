const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  @param {deleteBy} 删除者
 *  @param {delete} 被删除者
 *  @param {des} 描述
 *  @param {date} 删除时间
 */

const RecoverSchema = new Schema({
  deleteBy: {type: Schema.Types.ObjectId, ref: 'admin', index: true},
  delete: {type: Schema.Types.ObjectId},
  des: String,
  date: {type: Date, default: Date.now},
});

const Recover = moogose.model('recover', RecoverSchema)

module.exports = Recover