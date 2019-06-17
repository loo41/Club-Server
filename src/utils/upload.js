const multer = require('koa-multer')
const path = require('path')
 
const storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, path.join(process.cwd(), 'static'))
  },   
  filename: async function (req, file, cb) {
    let fileFormat = (file.originalname).split(".")  
    cb(null, Date.now() + 'Youngon' +"." + fileFormat[fileFormat.length - 1])
  }
})  
const upload = multer({ storage: storage })


module.exports = {
  upload
}