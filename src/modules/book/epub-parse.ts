import * as AdmZip from 'adm-zip';
import * as Xml2JS from 'xml2js';
import * as path from 'path';
import * as fs from 'fs';
import { getMetaFileName } from 'src/utils/prop';

export function upZip(bookPath: string, unzipPath: string) {
  const zip = new AdmZip(bookPath);
  zip.extractAllTo(unzipPath, true);
}

export function parseRootFile(unzipPath) {
  const metaFile = getMetaFileName();
  const containerFilePath = path.resolve(unzipPath, metaFile);
  const containerXml = fs.readFileSync(containerFilePath, 'utf-8');
  // console.log(containerXml);
  const { parseStringPromise } = Xml2JS;
  return parseStringPromise(containerXml, {
    explicitArray: false, // 返回Ｊson 結果而不是數組
  }).then((data) => {
    // console.log(data);
    // $ => 表示屬性
    const rootFile = data.container.rootfiles.rootfile['$']['full-path'];
    return rootFile;
  });
}
export function parseContentOpf(unzipPath, filePath) {
  // 獲取content.opf路徑
  const fullPath = path.resolve(unzipPath, filePath);
  const contentOpf = fs.readFileSync(filePath, 'utf-8');
  // console.log(contentOpf);
  const { parseStringPromise } = Xml2JS;
  return parseStringPromise(contentOpf, { explicitArray: false }).then(
    async (data) => {
      // console.log(data);
      const { metadata, manifest } = data.package;
      const title = metadata['dc:title']; // 書名
      const creater = metadata['dc:creater']; // 作者
      const language = metadata['dc:language']; // 語言
      const publisher = metadata['dc:publisher']; // 出版社
      const coverMeta = metadata.meta.find(
        (meta) => meta['$'].name === 'cover',
      );
      const coverId = coverMeta['$'].content;
      const coverRes = manifest.item.find((m) => m['$'].id === coverId);
      const dir = path.dirname(fullPath);
      const cover = path.resolve(dir, coverRes['$'].href);
      const rootDir = path.dirname(filePath);
      const content = await parseContent(dir, 'toc.ncx', rootDir);
      return {
        title,
        creater,
        language,
        publisher,
        cover,
        content,
        rootFile: filePath,
      };
    },
  );
}
/** 電子書目錄 解析  */
export async function parseContent(contentDir, contentFilePath, rootDir) {
  const contentPath = path.resolve(contentDir, contentFilePath);
  const contentXml = fs.readFileSync(contentPath, 'utf-8');
  // 一級目錄
  const { parseStringPromise } = Xml2JS;
  const data = await parseStringPromise(contentXml, { explicitArray: false });
  // console.log(data);
  const navMap = data.ncx.navMap.navPoint;
  // console.log(navMap);
  // 電子書目錄處理
  const navData = navMap.map((nav) => {
    const id = nav['$'].id;
    const playOrder = +nav['$'].playOrder;
    const text = nav.navLabel.text;
    const href = nav.content['$'].src;
    return {
      id,
      playOrder,
      text,
      href: `${rootDir}/${href}`,
    };
  });
  return navData;
}
