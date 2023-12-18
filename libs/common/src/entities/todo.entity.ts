import { UserEntity } from './user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('to-do')
export class ToDoEntity {
  @PrimaryGeneratedColumn('uuid')
  todo_guid: string;

  @Column()
  user_guid: string;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({ name: 'user_guid' })
  user: UserEntity;

  @Column()
  title: string;

  @Column()
  text: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp with time zone',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp with time zone',
  })
  updateAt: Date;
}

export interface CreateToDoDto {
  title: string;
  text: string;
  user_guid: string;
}

export interface UpdateToDoDto {
  title: string;
  text: string;
  todo_guid: string;
  user_guid: string;
}

export interface DeleteToDoDto {
  todo_guid: string;
  user_guid: string;
}

