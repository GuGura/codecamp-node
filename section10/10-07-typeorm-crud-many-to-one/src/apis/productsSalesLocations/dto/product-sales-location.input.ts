import { ProductSalesLocation } from '../entities/productSalesLocation.entity';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class ProductSalesLocationInput extends OmitType(
  ProductSalesLocation,
  ['id'],
  InputType,
) {}
