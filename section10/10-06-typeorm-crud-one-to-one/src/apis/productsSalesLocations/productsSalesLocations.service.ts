import { Injectable } from '@nestjs/common';
import { ProductSalesLocation } from './entities/productSalesLocation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsSalesLocationsService {
  constructor(
    @InjectRepository(ProductSalesLocation)
    private readonly productsSalesLocationsService: Repository<ProductSalesLocation>,
  ) {}

  /*
   서비스를 타고 가야하는 이유는 ..?
   Repository 에 여기 저기서 직접 적근하면 검증 로직을 통일 시킬 수 없음.
   */
  create({ productSalesLocation }): Promise<ProductSalesLocation> {
    return this.productsSalesLocationsService.save({ ...productSalesLocation });
  }
}
