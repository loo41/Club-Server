const { Banner } = require('../../models');
const { creatToken, isPassToken } = require('../../utils/token');
const config = require('config');

exports.uploadBannner = async(ctx) => {
  let {access} = ctx.req.body;
  const user = await isPassToken(ctx);
  if (!user) return;
  let banner = new Banner({
    publisher: access,
    bannerPath: config.get('basePath') + '/' + ctx.req.file.filename
  })
  await banner.save()
  ctx.body = {StatusCode: 200000, path: config.get('basePath') + '/' + ctx.req.file.filename}
}

exports.bannerList = async(ctx) => {
  let {access} = ctx.query;
  const user = await isPassToken(ctx);
  if (!user) return;
  const list = await Banner.find({publisher: access? access: user.access[0]})
  ctx.body = {StatusCode: 200000, list}
}

exports.bannerDel = async(ctx) => {
  const {_id} = ctx.params;
  await Banner.remove({_id});
  ctx.body = {StatusCode: 20000, msg: '删除成功'};
}

exports.updateBanner = async(ctx) => {
  const {sort, isRelease, _id} = ctx.request.body;
  await Banner.update({_id}, {sort, isRelease})
  ctx.body = {StatusCode: 200000, msg: '更新成功'}
}