import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Like, Repository } from 'typeorm';
import { QueryBookDto } from './dto/query-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getBooks(params: QueryBookDto) {
    let page = +params.page || 1;
    let pageSize = +params.pageSize || 20;
    const { title = '', author = '' } = params;
    if (page <= 0) {
      page = 1;
    }
    if (pageSize <= 0) {
      pageSize = 20;
    }
    let whereStr = 'Where 1=1';
    if (title) {
      whereStr += ` AND title Like '%${title}%'`;
    }
    if (author) {
      whereStr += ` AND author Like '%${author}%'`;
    }
    const sqlStr = `Select * From book ${whereStr} limit ${pageSize} offset ${
      (page - 1) * pageSize
    }`;
    return await this.bookRepository.query(sqlStr);
  }

  async countBooks(params: QueryBookDto) {
    const { title = '', author = '' } = params;
    const condition = {
      title: Like(`%${title}%`),
      author: Like(`%${author}%`),
    };
    return await this.bookRepository.countBy(condition);
  }
}
