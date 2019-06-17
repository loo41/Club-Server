const koa = require('koa');
const koaBody = require('koa-body');
const static = require('koa-static');
const logger = require('koa-morgan');
const config = require('config');
const router = require('./src/router');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('koa-cors');
const Globle = require('./middleware/globle');
const Redis = require('ioredis');
const error = require(`${path.resolve(__dirname, 'middleware/error')}`);
const { sendMails } = require(`${path.resolve(__dirname, 'middleware/mail')}`);

const app = new koa();
const redis = new Redis();

// 注册为全局方便调用
global.redis = redis;
global.sendMails = sendMails;

mongoose.connect(`mongodb://${config.get('host')}:${config.get('port')}/${config.get('db')}`, {
  useNewUrlParser: true 
});
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);


// 全局初始化 管理员 文件夹 处理
Globle.init()
Globle.initCache()


app
  .use(logger('":method :url" :status :res[content-length] ":referrer" ":user-agent"'))
  .use(error())
  .use(static(`${__dirname}/static`))
  .use(static(`${__dirname}/databak`))
  .use(koaBody())
  .use(cors())
  .use(router.routes())
	.use(router.allowedMethods());

module.exports = app
