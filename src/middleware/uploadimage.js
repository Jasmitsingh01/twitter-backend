import multer from "multer";
import ERROR from "../utils/ERRORREPOSE";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },

    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now())
      
    }


  })


  const fileFilter = (req, file, cb,next) => {
    try {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true)
          } else {
            cb(null, false)
            throw new ERROR('Invalid file',400)
          }
    } catch (error) {
        console.error(error)
        next(error)
    
        
    }
}
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

export default upload;