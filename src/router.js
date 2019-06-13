const Router = require('koa-router');
const config = require('config');

const { admin, active, Log, Mongo, Banner } = require('./controller');
const { upload } = require('./utils/upload');
// 验证权限
const { isPassToken } = require('./utils/token');

const router = new Router({prefix: '/'});

router
      .post('admin/login', admin.login)
      .get('admin/info', isPassToken, admin.getAdminInfo)
      .post('admin/register', admin.createAdmin)
      .get('admin/list/:limit', isPassToken, admin.getAdminList)
      .put('admin/update', admin.update)
      .delete('admin/delete/:_id', isPassToken, admin.delete)
      
router
      .post('admin/active', isPassToken, active.registerActive)
      .get('admin/active', isPassToken, active.getActiveList)
      .put('admin/active', active.updateActive)
      .delete('admin/active/:_id', isPassToken, active.delectActive)

router
      .get('admin/log', Log.logList)
      .delete('admin/log/:_id', Log.delLog)

router
      .get(`admin/backups`, Mongo.dbList)
      .post(`admin/backups`, Mongo.backups)
      .delete('admin/backups/:_id/:path', Mongo.delectFile)

router
      .get('admin/banner', isPassToken, Banner.bannerList)
      .delete('admin/banner/:_id', Banner.bannerDel)
      .put('admin/banner', Banner.updateBanner)

// 上传图像
router
      .post('admin/upload', upload.single('head_thumb'), (ctx) => {
        ctx.body = {StatusCode: 200000, path: config.get('basePath') + '/' + ctx.req.file.filename}
      })
      .post('admin/uploadBannerImg', isPassToken, upload.single('head_thumb'), Banner.uploadBannner)


module.exports = router



/** 
 * 
 * @StatusCode {700001} 已存在
 * @StatusCode {200000} 成功
 * @StatusCode {700002} Token过期 || 用户被删除后仍然在操作
 * 
*/