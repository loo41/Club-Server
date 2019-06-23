const authTJCU = require('auth-tjcu');
const { User, Message, Sign } = require('../../models');
const { creatToken } = require('../../utils/token');
const moment = require('moment');

exports.login = async(ctx) => {
  const {account, password} = ctx.request.body;
  const result = await authTJCU('http://j.tjcu.edu.cn/caslogin.jsp', {username: account, password})
  const {state} = result;
  if (!state) {
    return ctx.body = {StatusCode: 400001, msg: result.msg}
  } 
  if (state === 1) {
    let _id = ''
    let isUser = await User.find({account})
    if (isUser.length <= 0) {
      let user = new User({account})
      await user.save()
      _id = user._id
    } else {
      _id = isUser[0]._id
    }
    const token = await creatToken({_id, account}, moment().add(7, 'day').valueOf())
    ctx.body = {StatusCode: 200000, msg: '登陆成功', token}
  }
}

exports.getUserInfo = async(ctx) => {
  const {_id} = ctx.user
  let user = await User.findOne({_id})
  ctx.body = {StatusCode: 200000, user}
}

exports.message = async(ctx) => {
  const { content, _id } = ctx.request.body;
  const user = ctx.user;
  let message = new Message({
    user_id: user._id,
    admin_id: _id,
    content
  })
  await message.save()
  ctx.body = {StatusCode: 200000, msg: '留言成功'}
}

exports.messageList = async(ctx) => {
  let {admin_id, limit, sort, page} = ctx.query;
  limit = limit? Number(limit): 10;
  let currentPage = page? Number(page): 1;
  const skipnum = (currentPage - 1) * limit;
  let conf = {};
  if (admin_id) conf.admin_id = admin_id;
  let sortConf = {_id: -1}
  if (sort) sortConf = {sort: Number(sort)}
  const list = await Message.find(conf)
                            .sort(sortConf)
                            .skip(skipnum)
                            .limit(limit)
                            .populate({path: 'user_id', select: 'account head_thumb'})
  ctx.body = {StatusCode: 200000, list}
}

exports.isSign = async(ctx) => {
  const { _id } = ctx.request.body;
  const user = ctx.user;
  const sign = await Sign.find({user_id: user._id, admin_id: _id})
  if (sign.length) {
    ctx.body = {StatusCode: 200000, isSign: true}
  } else {
    ctx.body = {StatusCode: 200000, isSign: false}
  }
}