function error () {
  return async(ctx, next) => {next()}
}

module.exports =error