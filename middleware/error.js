const {Log} = require('../src/models')

function error () {
  return async(ctx, next) => {
    try {
      await next()
    } catch (e) {
      const err = new Log({
        type: 1,
        des: e,
      })
      await err.save()
      ctx.body = {StatusCode: 500000, msg: '服务器端错误'}
      console.log(e)
    }
  }
}

module.exports =error