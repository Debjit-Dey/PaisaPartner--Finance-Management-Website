const multer = require('multer');

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Store file in memory (no disk writes — required for Vercel serverless)
const storage = multer.memoryStorage();

// Only allow image formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG and PNG images are allowed'), false);
  }
};

const multerUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
});

/**
 * Middleware factory that wraps multer.single() and handles all upload errors,
 * sending proper JSON error responses instead of crashing or sending raw Express errors.
 *
 * Usage in routes: router.post('/upload-image', handleUpload('image'), handler)
 */
const handleUpload = (fieldName) => (req, res, next) => {
  multerUpload.single(fieldName)(req, res, (err) => {
    if (!err) {
      // No error — pass control to the next route handler
      return next();
    }

    // Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        message: `File too large. Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`,
      });
    }

    // Other errors (wrong file type from fileFilter, etc.)
    return res.status(400).json({
      message: err.message || 'File upload failed.',
    });
  });
};

module.exports = handleUpload;
