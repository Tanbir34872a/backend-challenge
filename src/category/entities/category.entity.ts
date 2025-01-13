import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('categories')
export class Category {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;
}
