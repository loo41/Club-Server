const Router = require('koa-router');
const config = require('config');

const { admin, active } = require('./controller');
const { upload } = require('./utils/upload');

const router = new Router({prefix: '/'});

router
      .post('admin/login', admin.login)
      .get('admin/info', admin.getAdminInfo)
      .post('admin/register', admin.createAdmin)
      .get('admin/list/:limit', admin.getAdminList)
      .put('admin/update', admin.update)
      .delete('admin/delete', admin.delete)
      
router
      .post('admin/active', active.registerActive)
      .get('admin/active_list', active.getActiveList)
      .put('admin/active_update', active.updateActive)

// 上传图像
router
      .post('admin/upload', upload.single('head_thumb'), (ctx) => {
        ctx.body = {StatusCode: 200000, path: config.get('basePath') + '/' + ctx.req.file.filename}
      }) 


module.exports = router



/** 
 * 
 * @StatusCode {700001} 已存在
 * @StatusCode {200000} 成功
 * @StatusCode {700002} Token过期 || 用户被删除后仍然在操作
 * 
*/