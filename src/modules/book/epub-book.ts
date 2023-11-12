import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as fse from 'fs-extra';
import { parseRootFile, upZip, parseContentOpf } from './epub-parse';

class EpubBook {
  private bookPath: string;
  private file: string;
  private fileName: string;
  private size: number;
  private TEMP_PATH = '.vben/tmp-book';

  constructor(bookPath, file) {
    this.bookPath = bookPath;
    this.file = file;
    this.fileName = file.originalname;
    this.size = file.size;
  }

  async parse() {
    // 1.生成臨時文件
    const homeDir = os.homedir();
    const tmpDir = path.resolve(homeDir, this.TEMP_PATH);
    // copy
    const tmpFile = path.resolve(tmpDir, this.fileName);
    fse.copySync(this.bookPath, tmpFile);
    // 2. epub電子書解壓
    const tmpUnzipDirName = this.fileName.replace('.pub', '');
    const tmpUnzipDir = path.resolve(tmpDir, tmpUnzipDirName);
    fse.mkdirpSync(tmpUnzipDir);
    upZip(this.bookPath, tmpUnzipDir);
    // 3. epub 電子書 root file 解析
    const rootFile = await parseRootFile(tmpUnzipDir);
    // 4. epub content opf 解析 + 5. epub 電子書目錄 解析
    const bookData = await parseContentOpf(tmpUnzipDir, rootFile);
    // 6. 刪除臨時文件
    fse.removeSync(tmpFile);
    fse.removeSync(tmpUnzipDir);
    return bookData;
  }
}
export default EpubBook;
