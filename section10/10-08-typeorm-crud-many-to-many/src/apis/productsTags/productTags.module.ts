import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTag } from './entities/productTag.entity';
import { ProductTagsService } from './productTags.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTag])],
  providers: [ProductTagsService],
})
export class ProductTagsModule {}
