const { Config } = require('../../models');


exports.configInfo = async(ctx) => {
  const user = ctx.user
  const config = await Config.findOne({corporation_id: user._id})
  ctx.body = {StatusCode: 200000, config}
}

exports.updateConfig = async(ctx) => {
  const {_id, notice, banner, signUp, brief, leavingMessage} = ctx.request.body;
  await Config.update({_id}, {
    notice, banner, signUp, brief, leavingMessage
  })
  ctx.body = {StatusCode: 200000, msg: '社团配置信息更新成功'}
}

exports.putGlobelConfig = async(ctx) => {
  const { config } = ctx.request.body;
  const redis = global.redis;
  redis.del('config');
  redis.set('config', JSON.stringify(config));
  ctx.body = {StatusCode: 200000, msg: '系统配置信息更新成功'};
}

exports.getGlobelConfig = async(ctx) => {
  const redis = global.redis;
  let result = await redis.get('config')
  ctx.body = {StatusCode: 200000, config: JSON.parse(result)};
}
