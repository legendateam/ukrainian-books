import { fileFormatUtil, fileSizeUtil } from '../../utils';
import { FileEnum } from '../../enums';
import { fileSizeConstant } from '../fileSize.constant';

class FileMessageErrorConstant {
    public static errorAvatarFormatConstant() {
        return `Формат файла повинен бути${fileFormatUtil(FileEnum.PHOTOS)}`;
    }

    public static errorAvatarSizeConstant() {
        return `розмір завеликий, повинен бути не більше ${fileSizeUtil(fileSizeConstant.SIZE_AVATAR)}Mb`;
    }
}

export const { errorAvatarFormatConstant, errorAvatarSizeConstant } = FileMessageErrorConstant;
