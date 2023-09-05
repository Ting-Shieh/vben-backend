import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fileName", ["fileName"], { unique: true })
@Index("category", ["category"], {})
@Index("fileName+category", ["fileName", "category"], {})
@Entity("book", { schema: "vbendb-dev" })
export class Book {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "fileName", unique: true, length: 255 })
  fileName: string;

  @Column("varchar", { name: "cover", nullable: true, length: 1024 })
  cover: string | null;

  @Column("varchar", { name: "title", length: 1024 })
  title: string;

  @Column("varchar", { name: "author", nullable: true, length: 1024 })
  author: string | null;

  @Column("varchar", { name: "publisher", nullable: true, length: 255 })
  publisher: string | null;

  @Column("varchar", { name: "bookId", nullable: true, length: 255 })
  bookId: string | null;

  @Column("int", { name: "category", nullable: true })
  category: number | null;

  @Column("varchar", { name: "categoryText", nullable: true, length: 255 })
  categoryText: string | null;

  @Column("varchar", { name: "language", nullable: true, length: 10 })
  language: string | null;

  @Column("varchar", { name: "rootFile", nullable: true, length: 255 })
  rootFile: string | null;

  @Column("varchar", { name: "originalName", nullable: true, length: 255 })
  originalName: string | null;

  @Column("varchar", { name: "filePath", nullable: true, length: 255 })
  filePath: string | null;

  @Column("varchar", { name: "unzipPath", nullable: true, length: 255 })
  unzipPath: string | null;

  @Column("varchar", { name: "coverPath", nullable: true, length: 255 })
  coverPath: string | null;

  @Column("varchar", { name: "createUser", nullable: true, length: 50 })
  createUser: string | null;

  @Column("bigint", { name: "createDt", nullable: true })
  createDt: string | null;

  @Column("bigint", { name: "updateDt", nullable: true })
  updateDt: string | null;

  @Column("int", { name: "updateType" })
  updateType: number;
}
