
import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('app/public/assets/img/experiences'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Filtro para aceptar solo imágenes webp
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/webp') {
    cb(null, true);
  } else {
    cb(new Error('Only .webp format is allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
