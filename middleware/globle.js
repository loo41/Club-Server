const {Admin} = require('../src/models');
const path = require('path');
const fs = require('fs');
const Config = require('config');

async function init () {
    const admin = await Admin.find({})
    // 初始化管理员
    if (!admin.length) {
        const admin = new Admin({
            access: Config.get('access'), account: Config.get('account'), password: Config.get('password'),
            clubName: Config.get('clubName'), head_thumb: Config.get('head_thumb'),
            brief: Config.get('brief'),
        });
        await admin.save()
    }
    let dbpathFolder = path.resolve(process.cwd(), 'databak')
    // 新建文件夹
    if (!fs.existsSync(dbpathFolder)) {
        fs.mkdirSync(dbpathFolder)
    }
    let staticpathFolder = path.resolve(process.cwd(), 'static')
    if (!fs.existsSync(staticpathFolder)) {
        fs.mkdirSync(dbpathFostaticpathFolderlder)
    }
}

function initCache () {
    const redis = global.redis;
    // redis.del('config')
    redis.get('config').then(function (result) {
        if (!result) {
            redis.set('config', JSON.stringify(Config.get('config')))
        }
    });
}

module.exports = {
    init,
    initCache
}