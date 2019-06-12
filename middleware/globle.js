const {Admin} = require('../src/models');
const path = require('path');
const fs = require('fs');

async function init () {
    const admin = await Admin.find({})
    // 初始化管理员
    if (!admin.length) {
        const admin = new Admin({
            access: ['system_admin'], account: 'youngon', password: 'youngon',
            clubName: 'none', head_thumb: ''
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

module.exports = {
    init
}