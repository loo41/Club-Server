const { Admin, Banner } = require('../../models');

exports.getClubList = async(ctx) => {
  let {limit, content, page, _id} = ctx.query;
  let currentPage = page? Number(page): 1;
  limit = limit? Number(limit): 100;
  const skipnum = (currentPage - 1) * limit;
  let conf = {access: { $in: ['super_admin', 'admin']}};
  if (content) conf.clubName = {$regex: new RegExp(content, 'ig')};
  if (_id) conf._id = _id
  const list = await Admin
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
  let total = _id? '': await Admin.count(conf);
  ctx.body = {StatusCode: 200000, list, total};
}

exports.bannerList = async(ctx) => {
  let {access, isRelease, _id, limit} = ctx.query;
  limit = limit? Number(limit): 10;
  let conf = {isRelease: isRelease? isRelease: true}
  if (access) conf.publisher = access
  if (_id) conf.publisher_id = _id
  const list = await Banner.find(conf)
                            .sort({_id: -1})
                            .limit(limit)
  ctx.body = {StatusCode: 200000, list}
}