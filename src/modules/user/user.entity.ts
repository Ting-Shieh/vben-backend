import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('admin_user', { schema: 'vbendb-dev' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ unique: true })
  @Column()
  @Unique(['username'])
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  role: string;

  @Column()
  nickname: string;

  @Column()
  active: number;
}