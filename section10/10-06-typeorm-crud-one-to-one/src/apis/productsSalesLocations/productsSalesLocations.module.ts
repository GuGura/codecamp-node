import { Module } from '@nestjs/common';
import { ProductsSalesLocationsService } from './productsSalesLocations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSalesLocation } from './entities/productSalesLocation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductSalesLocation, // repository
    ]),
  ],
  providers: [ProductsSalesLocationsService],
  exports: [ProductsSalesLocationsService],
})
export class ProductsSalesLocationsModule {}
