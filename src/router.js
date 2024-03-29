const Router = require('koa-router');
const config = require('config');

const { admin, active, Log, Mongo, Banner, Article, User, Config, Club, Activity, FrontUser } = require('./controller');
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


router
      .get('admin/article', Article.articleList)
      .delete('admin/article/:_id', Article.delArticle)
      .post('admin/article', isPassToken,  Article.createArticle)
      .put('admin/article', Article.updateArticle)

router
      .get('admin/user', User.userList)
      .put('admin/user', User.update)


router
      .get('admin/config', isPassToken, Config.configInfo)
      .put('admin/config', Config.updateConfig)
      .get('admin/globel_config', Config.getGlobelConfig)
      .put('admin/globel_config', Config.putGlobelConfig)

// 上传图像
router
      .post('admin/upload', upload.single('head_thumb'), (ctx) => {
        ctx.body = {StatusCode: 200000, path: config.get('basePath') + '/' + ctx.req.file.filename}
      })
      .post('admin/uploadBannerImg', isPassToken, upload.single('head_thumb'), Banner.uploadBannner)




// 前端

router
      .get('user/globel_config', Config.getGlobelConfig)
      
router
      .get('user/clubName', Club.getClubList)
      .get('user/banner', Club.bannerList)

router
      .get('user/activity', Activity.activityList)

router
      .post('user/login', FrontUser.login)
      .get('user/info', isPassToken, FrontUser.getUserInfo)
      .post('user/message', isPassToken, FrontUser.message)
      .get('user/message', FrontUser.messageList)
      .post('user/sign', isPassToken, FrontUser.isSign)

module.exports = router



/** 
 * 
 * @StatusCode {700001} 已存在
 * @StatusCode {200000} 成功
 * @StatusCode {700002} Token过期 || 用户被删除后仍然在操作
 * 
*/