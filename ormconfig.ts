import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnum } from 'src/enum/config.enum';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

/** 通過環境變量讀取不同的.env文件 */
function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {};
}

/** 獲取不同的環境配置 */
function getServerConfig() {
  // 默認配置
  const defaultConfig = getEnv('.env');
  // 環境配置
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);
  return { ...defaultConfig, ...envConfig };
}

/**
 * 通過dotenv解析不同的配置
 * @returns
 */
export function buildConnectionOptions() {
  const config = getServerConfig();
  const entitiesDir =
    process.env.NODE_ENV === 'test'
      ? [__dirname + '/modules/**/*.entity.ts']
      : [__dirname + '/modules/**/*.entity{.js,.ts}'];
  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: entitiesDir,
    synchronize: true,
    logging: false,
  } as TypeOrmModuleOptions;
}
export const connectionParams = buildConnectionOptions();

/** 遷移資料庫 */
export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
