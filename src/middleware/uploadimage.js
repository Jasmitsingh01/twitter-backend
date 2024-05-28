import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },

    filename: function (req, file, cb) {
      cb(null, file.originalname )
      
    }


  })

const filter= function (req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp' ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
  const upload = multer({
    storage: storage,
    fileFilter: filter,
  
  })

export default upload;