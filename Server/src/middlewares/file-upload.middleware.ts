import multer from 'multer';

import { IRequest } from '../interfaces';
import { fileSizeConstant } from '../constants/file-size.constant';
import { errorMessageConstant, fileMimetypeConstant } from '../constants';
import { FileEnum, HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../error';

class FileUploadMiddleware {
    public static userAvatar(): multer.Multer {
        return multer({
            limits: { fileSize: fileSizeConstant.SIZE_AVATAR },
            fileFilter(_: IRequest, file: Express.Multer.File, callback: multer.FileFilterCallback) {
                if (!fileMimetypeConstant[FileEnum.PHOTOS].includes(file.mimetype)) {
                    return callback(
                        new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
                    );
                }
                callback(null, true);
            },
        });
    }
}
export const { userAvatar } = FileUploadMiddleware;
