const { Article } = require('../../models');

exports.createArticle = async(ctx) => {
  const { title, article_thumb, content } = ctx.request.body;
  let article = new Article({
    title, publisher_id: ctx.user._id, content, article_thumb
  })
  await article.save()
  ctx.body = {StatusCode: 200000, msg: '添加文章成功'}
}

exports.delArticle = async(ctx) => {
  const {_id} = ctx.params;
  await Article.remove({_id});
  ctx.body = {StatusCode: 200000, msg: '文章删除成功'};
}

exports.updateArticle = async(ctx) => {
  const { sort, _id } = ctx.request.body;
  await Article.update({_id}, {sort});
  ctx.body = {StatusCode: 200000, msg: '文章更新成功'};
}

exports.articleList = async(ctx) => {
  let {page, limit} = ctx.query;
  let currentPage = page? Number(page): 1;
  limit = limit? Number(limit): 100;
  const skipnum = (currentPage - 1) * limit;
  let list = await Article
                      .find({})
                      .sort({_id: -1})
                      .skip(skipnum)
                      .limit(limit)
  let total = await Article.count();
  ctx.body = {StatusCode: 200000, list, total};
}