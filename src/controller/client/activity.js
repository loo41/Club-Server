const { Active } = require('../../models');

exports.activityList = async(ctx) => {
  let {adminId, limit, status, content, sort, _id} = ctx.query;
  limit = limit? Number(limit): 10;
  let conf = {};
  if (adminId) conf.adminId = adminId;
  if (_id) conf._id = _id;
  if (status) conf.status = Number(status);
  if (content) conf.title = {$regex: new RegExp(content, 'ig')};
  let sortConf = {_id: -1}
  if (sort) sortConf = {sort: Number(sort)}
  const list = await Active.find(conf)
                            .sort(sortConf)
                            .limit(limit)
                            .populate({path: 'adminId', select: 'clubName'})
  ctx.body = {StatusCode: 200000, list}
}