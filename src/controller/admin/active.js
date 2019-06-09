const { Active } = require('../../models');
const { creatToken, isPassToken } = require('../../utils/token');


exports.registerActive = async(ctx) => {
  const {title, brief, imageUrl, isSignInfo, list, status} = ctx.request.body;
  const user = await isPassToken(ctx);
  if (!user) return;
  let active = new Active({
    title, brief, imageUrl, isSignInfo, list, status, adminId: user._id
  });
  await active.save()
  ctx.body = {StatusCode: 20000}
}