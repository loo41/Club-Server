const jwt = require('jwt-simple');
const config = require('config');
const moment = require('moment');

exports.creatToken = async (Options) => {
  const times = moment().add(2, 'hours').valueOf();
  Options.exp = times;
  Options.password = 'noPassword';
  return jwt.encode(Options, config.get('secret'));
}

exports.isPassToken = async (ctx, Token) => {
  try {
    let token = Token || ctx.headers.token 
                || ctx.query.token
                || ctx.header.token
                || ctx.request.body.token
                || ctx.body.token;
    if (!token) {
      ctx.body = {StatusCode: 700002, msg: '用户不存在'};
      return false;
    }
    let user = jwt.decode(token, config.get('secret'), 'HS256');
    if (user.exp + (2 * 60 * 1000) < Date.now()) {
      ctx.body = {StatusCode: 700002, msg: 'token过期'};
      return false;
    }
    return user;
  } catch (e) {
    ctx.body = {StatusCode: 700002, msg: '用户不存在'};
  }
}
