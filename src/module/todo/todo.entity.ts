import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class Todos extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'todo_id' })
  id: number;

  @Column({ name: 'activity_group_id' })
  activity_group_id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'is_active' })
  is_active: boolean;

  @Column({ name: 'priority' })
  priority: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
