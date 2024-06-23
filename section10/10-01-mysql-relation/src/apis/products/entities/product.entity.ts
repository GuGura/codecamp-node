import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSalesLocation } from '../../productsSalesLocations/entities/productSalesLocation.entity';
import { JoinColumn, JoinTable } from 'typeorm';
import { ProductCategory } from '../../productsCategories/entities/productCategory.entity';
import { User } from '../../users/entities/user.entity';
import { ProductTag } from '../../productsTags/entities/productTag.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: false }) // 기본값 tinyint
  isSoldOut: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSalesLocation)
  productSalesLocations: ProductSalesLocation;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  productTags: ProductTag[];
}
