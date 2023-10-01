import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('')
  getBooks(@Query() params) {
    return this.bookService.getBooks(params);
  }
  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id) {
    return 'book id is ' + id;
  }
}
