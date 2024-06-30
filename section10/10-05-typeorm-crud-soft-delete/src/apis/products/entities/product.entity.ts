import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductSalesLocation } from '../../productsSalesLocations/entities/productSalesLocation.entity';
import { JoinColumn, JoinTable } from 'typeorm';
import { ProductCategory } from '../../productsCategories/entities/productCategory.entity';
import { User } from '../../users/entities/user.entity';
import { ProductTag } from '../../productsTags/entities/productTag.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false }) // 기본값 tinyint
  @Field(() => Boolean)
  isSoldOut: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSalesLocation)
  @Field(() => ProductSalesLocation)
  productSalesLocations: ProductSalesLocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  @DeleteDateColumn() // 소프트삭제 시간 기록을 위한 컬럼
  deletedAt: Date;

  @UpdateDateColumn() // 업데이트 시간 기록을 위한 컬럼
  updatedAt: Date;

  @CreateDateColumn() // 생성 시간 기록을 위한 컬럼
  createdAt: Date;
}
