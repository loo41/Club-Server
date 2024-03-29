const { Admin, Recover, Config } = require('../../models');
const { creatToken } = require('../../utils/token');

exports.login = async(ctx) => {
  const {userName, password} = ctx.request.body;
  const club = await Admin.find({account: userName, password});
  if (!club.length) return ctx.body = {StatusCode: 400004, msg: '对不起，你的账户不存在'};
  const token = await creatToken(club[0]);
  return ctx.body = {StatusCode: 200000, msg: '登陆成功', token};
}

exports.getAdminInfo = async(ctx) => {
  const user = ctx.user;
  let admin = await Admin.findOne({_id: user._id});
  if (JSON.stringify(admin) === '{}') return ctx.body = {StatusCode: 700002, msg: '用户不存在'};
  ctx.body = {StatusCode: 200000, admin}
}


exports.createAdmin = async(ctx) => {
  const {access, account, password, clubName, head_thumb, brief} = ctx.request.body;
  const [isExisClub, isExisAcc] = await Promise.all([Admin.find({clubName}), Admin.find({account})]);
  if (isExisClub.length || isExisAcc.length) return ctx.body = {StatusCode: 700001, msg: '您注册的社团已经存在'};
  const admin = new Admin({
    access: [access], account, password,
    clubName, head_thumb, brief
  });
  await admin.save();
  ctx.body = {StatusCode: 200000, msg: '社团注册成功'};
  let config = new Config({corporation_id: admin._id});
  await config.save();
}

exports.getAdminList = async(ctx) => {
  let {page} = ctx.params;
  let {limit, content} = ctx.query;
  let currentPage = page? Number(page): 1;
  limit = limit? Number(limit): 100;
  const skipnum = (currentPage - 1) * limit;
  const user = ctx.user;
  const {access, _id} = user;
  let conf;
  if (access[0] === 'system_admin') conf = {};
  else if (access[0] === 'super_admin') conf = {access: { $in: ['super_admin', 'admin', 'user']}};
  else if (access[0] === 'admin') conf = {_id};
  else if (access[0] === 'user') conf = {_id};
  if (content) conf.clubName = {$regex: new RegExp(content, 'ig')};
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
  let total = await Admin.count(conf);
  ctx.body = {StatusCode: 200000, list, total};
}

exports.update = async(ctx) => {
  const {_id, access, account, brief, clubName, head_thumb, sort, star} = ctx.request.body;
  await Admin.update({_id}, {
    access, account, clubName, head_thumb, sort, star, brief
  })
  ctx.body = {StatusCode: 200000, msg: '社团更新成功'}
}

exports.delete = async(ctx) => {
  const {_id} = ctx.params;
  const user = ctx.user;
  await Admin.remove({_id});
  let recover = new Recover({
    deleteBy: user._id,
    delete: _id,
    des: '社团管理员被删除'
  })
  await recover.save()
  ctx.body = {StatusCode: 200000, msg: '社团管理员删除成功'}
}