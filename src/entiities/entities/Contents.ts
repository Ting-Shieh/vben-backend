import { Column, Entity } from "typeorm";

@Entity("contents", { schema: "vbendb-dev" })
export class Contents {
  @Column("varchar", { primary: true, name: "fileName", length: 100 })
  fileName: string;

  @Column("varchar", { name: "id", nullable: true, length: 100 })
  id: string | null;

  @Column("varchar", { name: "href", nullable: true, length: 255 })
  href: string | null;

  @Column("int", { name: "order", nullable: true })
  order: number | null;

  @Column("int", { name: "level", nullable: true })
  level: number | null;

  @Column("varchar", { name: "text", nullable: true, length: 500 })
  text: string | null;

  @Column("varchar", { name: "label", nullable: true, length: 255 })
  label: string | null;

  @Column("varchar", { name: "pid", nullable: true, length: 255 })
  pid: string | null;

  @Column("varchar", { primary: true, name: "navId", length: 100 })
  navId: string;
}
