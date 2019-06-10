const { Active } = require('../../models');
const { creatToken, isPassToken } = require('../../utils/token');


exports.registerActive = async(ctx) => {
  const {title, brief, imageUrl, isSignInfo, list, status} = ctx.request.body;
  const user = await isPassToken(ctx);
  if (!user) return;
  let active = new Active({
    title, brief, imageUrl, isSignInfo, list, status, adminId: user._id
  });
  await active.save()
  ctx.body = {StatusCode: 200000}
}

exports.getActiveList = async(ctx) => {
  let {page, limit, access, sort, content} = ctx.query;
  const currentPage = page? Number(page): 1;
  limit = limit? Number(limit): 100;
  const skipnum = (currentPage - 1) * limit;
  const user = await isPassToken(ctx);
  if (!user) return;
  let conf = {};
  if (access && access == 'admin') {
    conf.adminId = user._id
  };
  if (content) conf.title = {$regex: new RegExp(content, 'ig')};
  const list = await Active
                      .find(conf)
                      .sort(sort? sort: {_id: -1})
                      .skip(skipnum)
                      .limit(limit);
  let total = await Active.count(conf);
  ctx.body = {StatusCode: 200000, list, total};
}

exports.updateActive = async(ctx) => {
  const {_id, title, brief, imageUrl, isSignInfo, list, status} = ctx.request.body;
  await Active.update({_id}, { title, brief, imageUrl, isSignInfo, list, status });
  ctx.body = {StatusCode: 200000, msg: '更新成功'}
}