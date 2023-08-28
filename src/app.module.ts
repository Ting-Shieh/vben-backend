import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [UserModule, AuthModule, BookModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
