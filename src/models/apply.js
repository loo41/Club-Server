const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  @param {apply_id} 申请人 _id
 *  @param {reason} 申请原因
 *  @param {isPass} 是否通过
 *  @author {TCYong}
 */

const ApplySchema = new Schema({
  apply_id: {type: Schema.Types.ObjectId, ref: 'admin', index: true},
  reason : Boolean,
  isPass: {type: Boolean, default: false},
  isShow: {type: Boolean, default: true}
});

const Apply = moogose.model('apply', ApplySchema)

module.exports = Apply