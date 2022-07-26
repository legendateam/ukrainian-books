import { fileMimetypeConstant } from '../../constants';
import { FileEnum } from '../../enums';

export const fileFormatUtil = (fileType: FileEnum): string => fileMimetypeConstant[fileType].join('/')
    .split('/').join(' ').replaceAll('image', '');
