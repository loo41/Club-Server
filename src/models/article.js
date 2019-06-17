const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  @param {title} 文章标题
 *  @param {publisher_id} 发布者 _id
 *  @param {content} 文章内容
 *  @param {visits} 访问次数
 *  @param {head_thumb} 文章主图
 *  @param {date} 创建日期
 *  @param {source} 发布来源 {1: 来着管理员发布，2: 来着用户发布}
 *  @author {TCYong}
 */

const ArticleSchema = new Schema({
  title: String,
  publisher_id: {type: Schema.Types.ObjectId, ref: 'admin', index: true},
  content: String,
  visits: {type: Number, default: 0},
  article_thumb: String,
  sort: {type: Number, default: 1, index: true},
  date: {type: Date, default: Date.now}
});

const Article = moogose.model('article', ArticleSchema)

module.exports = Article