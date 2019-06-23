const jwt = require('jwt-simple');
const config = require('config');
const moment = require('moment');

exports.creatToken = async (Options, time) => {
  const times = moment().add(2, 'hours').valueOf();
  Options.exp = time || times;
  Options.password = 'noPassword';
  return jwt.encode(Options, config.get('secret'));
}

exports.isPassToken = async (ctx, next) => {
  try {
    let token = ctx.headers.token 
                || ctx.query.token
                || ctx.header.token
                || ctx.request.body.token;
    if (!token) {
      return ctx.body = {StatusCode: 700002, msg: '用户不存在'};
    }
    let user = jwt.decode(token, config.get('secret'), 'HS256');
    if ((ctx.request.url.indexOf('admin') !== -1 && user.exp + (2 * 60 * 1000) < Date.now() ||
    ctx.request.url.indexOf('user') !== -1 && user.exp + (7 * 24 * 60 * 1000) < Date.now())) {
      return ctx.body = {StatusCode: 700002, msg: 'token过期'};
    }
    ctx.user = user;
    await next();
  } catch (e) {
    console.log(e)
    throw(e);
  }
}
