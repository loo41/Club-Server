const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  考虑到 管理员类型可能改变，不在使 _id 作区分
 *  @param {publisher} 发布者类型 {1: admin 2: super_admin}
 *  @param {publisher_id} 发布者 _id
 *  @param {bannerPath} 图片路径
 *  @param {date} 创建日期
 *  @author {TCYong}
 */

const BannerSchema = new Schema({
  publisher: {type: String, index: true},
  bannerPath: String,
  sort: {type: Number, default: 1, index: true},
  date: {type: Date, default: Date.now},
  isRelease: {type: Boolean, default: true}
});

BannerSchema.path('date').get(function (v) {
  return moment(v).format("YYYY-MM-DD HH:mm:ss");
})


const Banner = moogose.model('banner', BannerSchema)

module.exports = Banner