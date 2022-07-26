import { fileFormatUtil, fileSizeUtil } from '../../utils';
import { FileEnum } from '../../enums';
import { fileSizeConstant } from '../fileSize.constant';

class FileMessageErrorConstant {
    public static errorFormatConstant() {
        return `Помилка: Формат файла повинен бути${fileFormatUtil(FileEnum.PHOTOS)}, або`;
    }

    public static errorSizeConstant() {
        return `розмір завеликий, повинен бути не більше ${fileSizeUtil(fileSizeConstant.SIZE_AVATAR)}Mb`;
    }
}

export const { errorFormatConstant, errorSizeConstant } = FileMessageErrorConstant;
