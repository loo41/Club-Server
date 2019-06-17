const {Mongo} = require('../../models')
const {deleteFolder, zip, execFun} = require('../../utils/file')
const path = require('path')
const Config = require('config')
const fs = require('fs')

exports.dbList = async(ctx) => {
  let {page, limit} = ctx.query
  let currentPage = page? Number(page): 1
  const skipnum = (currentPage - 1) * limit
  let list = await Mongo
                        .find({})
                        .sort({_id: -1})
                        .skip(skipnum)
                        .limit(limit? Number(limit): 1000)
  let total = await Mongo.count()
  ctx.body = {StatusCode: 200000, list, total}
}

exports.backups = async(ctx) => {
  let dbpathFolder = path.resolve(process.cwd(), 'databak')
  if (!fs.existsSync(dbpathFolder)) {
    fs.mkdirSync(dbpathFolder)
  }
  let dbFolder = String(Date.now())
  let dbpath = path.join(dbpathFolder, dbFolder)
  if (!fs.existsSync(dbpath)) {
    fs.mkdirSync(dbpath)
    await execFun(`mongodump -h ${Config.get('host')} -d ${Config.get('db')} -o ${dbpath}`)
    await zip(dbpath)
    let mongo = new Mongo({
      path: dbpath,
      filename: dbFolder + '.zip',
    })
    await mongo.save()
    ctx.body = {StatusCode: 200000, msg: '备份成功'}
  }
}

exports.delectFile = async(ctx) => {
  const {path, _id} = ctx.params
  await deleteFolder(path)
  if (fs.existsSync(path + '.zip')) {
    await fs.unlinkSync(path + '.zip')
  }
  await Mongo.remove({_id})
  ctx.body = {StatusCode: 200000, msg: '删除成功'}
}
