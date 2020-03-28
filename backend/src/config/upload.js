const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
           const ext = path.extname(file.originalname);
           var str = file.originalname.replace(/\s{1,}/g, '');
           const name = path.basename(str, ext); 

           cb(null, `${name}-${Date.now()}${path.extname(ext)}`);
        }, 
    }),
};