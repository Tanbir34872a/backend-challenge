import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('products')
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string; //The product's name.

  @Column()
  description: string; //A brief description of the product.

  @Column('decimal')
  price: number; //The product's price.

  @Column('decimal')
  discount: number; //Applicable discount (percentage).

  @Column()
  image: string; //Product's image url.

  @Column({ default: 'In Stock' })
  status: 'Stock Out' | 'In Stock'; //Availability status (Stock Out / In Stock).

  @Column({ unique: true })
  productCode: string; //An auto-generated unique identifier

  @Column('objectId')
  categoryId: ObjectId;
}
