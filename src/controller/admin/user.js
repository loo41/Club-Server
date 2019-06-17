const {User} = require('../../models');

exports.userList = async(ctx) => {
  let {limit, content, page} = ctx.query;
  let currentPage = page? Number(page): 1;
  limit = limit? Number(limit): 100;
  const skipnum = (currentPage - 1) * limit;
  let conf = {};
  if (content) conf.account = {$regex: new RegExp(content, 'ig')};
  const list = await User
                      .find(conf)
                      .sort({_id: -1})
                      .skip(skipnum)
                      .limit(limit)
                      .map(res => {
                        res = res.map((item) => {
                          item.password = Date.now()
                          return item
                        })
                        return res
                      });
  let total = await User.count(conf);
  ctx.body = {StatusCode: 200000, list, total};
}

exports.update = async(ctx) => {
  const {_id, blacklist} = ctx.request.body;
  await User.update({_id}, { blacklist })
  ctx.body = {StatusCode: 200000, msg: blacklist? '设置黑名单成功': '设置白名单成功'}
}