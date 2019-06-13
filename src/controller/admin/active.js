const { Active } = require('../../models');


exports.registerActive = async(ctx) => {
  const {title, brief, imageUrl, isSignInfo, list, status, limit} = ctx.request.body;
  let active = new Active({
    title, brief, imageUrl, isSignInfo, list, status, limit, adminId: user._id
  });
  await active.save()
  ctx.body = {StatusCode: 200000}
}

exports.getActiveList = async(ctx) => {
  let {page, limit, access, sort, content, searchIf} = ctx.query;
  const currentPage = page? Number(page): 1;
  limit = limit? Number(limit): 100;
  const skipnum = (currentPage - 1) * limit;
  const user = ctx.user;
  let conf = {};
  if (access && access == 'admin') {
    conf.adminId = user._id
  };
  if (content) conf.title = {$regex: new RegExp(content, 'ig')};
  if (searchIf && (searchIf = JSON.parse(searchIf))){
    const { _id, searchContent } = searchIf;
    if (_id) conf.adminId = _id;
    if (searchContent) conf.title = {$regex: new RegExp(searchContent, 'ig')}
  }
  const list = await Active
                      .find(conf)
                      .sort(sort? sort: {_id: -1})
                      .skip(skipnum)
                      .limit(limit);
  let total = await Active.count(conf);
  ctx.body = {StatusCode: 200000, list, total};
}

exports.updateActive = async(ctx) => {
  const {_id, title, brief, imageUrl, isSignInfo, list, status, star, sort, limit} = ctx.request.body;
  await Active.update({_id}, { title, brief, imageUrl, isSignInfo, list, status, star, sort, limit});
  ctx.body = {StatusCode: 200000, msg: '更新成功'}
}

exports.delectActive = async(ctx) => {
  const {_id} = ctx.params;
  await Active.remove({_id});
  ctx.body = {StatusCode: 200000, msg: '活动删除成功'}
}