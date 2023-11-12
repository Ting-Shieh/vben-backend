import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { BookService } from './book.service';
import { wrapperCountResponse, wrapperResponse } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { getFileUploadPath } from 'src/utils/prop';
import * as fs from 'fs';
import * as path from 'path';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('')
  getBooks(@Query() params) {
    return wrapperCountResponse(
      this.bookService.getBooks(params),
      this.bookService.countBooks(params),
      '獲取圖書列表成功',
    );
  }
  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id) {
    return 'book id is ' + id;
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadBook(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /epub/,
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    // console.log(file);
    return wrapperResponse(this.bookService.uploadBook(file), '上傳文件成功');
  }
}
