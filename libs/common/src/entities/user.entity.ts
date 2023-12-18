import { ToDoEntity } from './todo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  user_guid: string;

  @Column()
  name: string;

  @OneToMany(() => ToDoEntity, (todo) => todo.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todo_guid' })
  todos: ToDoEntity[];

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
}

export type CreateUserDto = Partial<
  Pick<UserEntity, 'name' | 'email' | 'password'>
>;

export type LoginUserDto = Partial<Pick<UserEntity, 'email' | 'password'>>;
