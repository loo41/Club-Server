const {Log} = require('../../models');
const {timeFormat} = require('../../utils/time');

exports.logList = async(ctx) => {
  const {page} = ctx.query;
  const pageSize = 10;
  const currentPage = page;
  const skipnum = (currentPage - 1) * pageSize;
  let list = await Log
                      .find({})
                      .sort({_id: -1})
                      .skip(skipnum)
                      .limit(pageSize)
  let total = await Log.count();
  ctx.body = {StatusCode: 200000, list, total};
}

exports.delLog = async(ctx) => {
  const {_id} = ctx.params;
  await Log.remove({_id});
  ctx.body = {StatusCode: 20000, msg: '删除成功'};
}