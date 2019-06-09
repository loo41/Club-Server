const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  @param {adminId} 关联的对应社团
 *  @param {title} 标题
 *  @param {brief} 简介
 *  @param {status} 活动状态 {0: 未开始, 1: 进行中, 2: 已结束}
 *  @param {isSignInfo} 是否需要报名 {0: 不需要, 1: 需要}
 *  @param {imageUrl} 活动展示图
 *  @param {star} 星级活动
 *  @param {sort} 排序大小
 *  @param {list} 问答数组
 *  @author {TCYong}
 */

const ActiveSchema = new Schema({
  adminId: {type: Schema.Types.ObjectId, ref: 'admin', index: true},
  title: String,
  brief: String,
  status: Array,
  isSignInfo: String,
  imageUrl: String,
  star: {type: Boolean, default: false},
  sort: {type: Number, default: 1, index: true},
  date: {type: Date, default: Date.now},
  list: {type: Array, default: []}
});

const Active = moogose.model('active', ActiveSchema)

module.exports = Active