import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: () => ({
    folder: 'avatars',
    format: 'jpeg',
    allowedFormats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 400, height: 400, crop: 'limit' }],
  }),
});

const postStorage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: () => ({
    folder: 'posts',
    format: 'jpeg',
    allowedFormats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  }),
});

export const avatarMiddleware = multer({ storage: avatarStorage }).single(
  'avatar'
);
export const postMiddleware = multer({ storage: postStorage }).array('post', 2);
