import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  request_date: Date;

  @Column({ type: 'datetime' })
  deadline: Date;

  @Column({ default: false })
  completed: boolean;

  @Column()
  price: number;
}
