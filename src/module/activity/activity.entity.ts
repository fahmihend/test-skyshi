import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('activities')
export class Activities extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'activity_id' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
