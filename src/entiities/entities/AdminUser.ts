import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IDX_4d0392574f49340bb75a102b04", ["username"], { unique: true })
@Entity("admin_user", { schema: "vbendb-dev" })
export class AdminUser {
  @Column("varchar", { name: "avatar", length: 255 })
  avatar: string;

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "role", length: 255 })
  role: string;

  @Column("varchar", { name: "nickname", length: 255 })
  nickname: string;

  @Column('tinyint', { name: 'active' })
  active: number;
}
