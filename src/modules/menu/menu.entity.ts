import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('menu', { schema: 'vbendb-dev' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  path: string;

  @Column()
  @Unique(['name'])
  name: string;

  @Column()
  redirect: string;

  @Column()
  meta: string;

  // 父菜單節點
  @Column({ default: 0 })
  pid: number;

  // 1 - 可用 ｜0 - 不可用
  @Column({ default: 1 })
  active: number;
}
