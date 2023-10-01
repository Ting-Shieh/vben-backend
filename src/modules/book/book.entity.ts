import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('book', { schema: 'vbendb-dev' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '檔案名稱' })
  @Unique(['fileName'])
  fileName: string;

  @Column()
  cover: string;

  @Column({ comment: '書名' })
  title: string;

  @Column({ comment: '作者' })
  author: string;

  @Column({ comment: '出版社' })
  publisher: string;

  @Column()
  bookId: string;

  @Column()
  category: number;

  @Column()
  categoryText: string;

  @Column({ comment: '語系' })
  language: string;

  @Column()
  rootFile: string;
}
