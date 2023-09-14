import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as path from 'path';
// import * as fs from 'fs';
// // https 證書處理
// const dir = process.cwd(); // 根路徑
// const httpsOptions = {
//   key: fs.readFileSync(path.resolve(dir, './https/private-key-file.key')),
//   cert: fs.readFileSync(path.resolve(dir, './https/pem-file.pem')),
// };
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    // httpsOptions, // 升級成 https
  });
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
