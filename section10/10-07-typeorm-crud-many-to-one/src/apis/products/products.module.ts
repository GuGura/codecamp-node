import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSalesLocationsModule } from '../productsSalesLocations/productsSalesLocations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, // repository
    ]),
    ProductsSalesLocationsModule,
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
