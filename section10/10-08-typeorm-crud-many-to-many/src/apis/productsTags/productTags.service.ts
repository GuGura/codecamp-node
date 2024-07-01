import { Injectable } from '@nestjs/common';
import { ProductTag } from './entities/productTag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductTagsService {
  constructor(
    @InjectRepository(ProductTag)
    private readonly productTagsRepository: Repository<ProductTag>,
  ) {}

  // create({ tagNames }: { tagNames: string[] }): Promise<ProductTag[]> {
  //   c;
  //   this.productTagsRepository.insert(tagNames);
  // }
}
