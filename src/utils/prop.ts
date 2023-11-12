import { CloudEnum } from 'src/enum/cloud.enum';
import { EpubDataEnum } from 'src/enum/epub-data.enum';

export function getFileUploadPath() {
  return CloudEnum.UPLOAD_EBOOK_FILE_PATH;
}

export function getMetaFileName() {
  return EpubDataEnum.META_FILE_NAME;
}
