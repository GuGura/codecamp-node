import { Module } from '@nestjs/common';

import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [BoardsModule, UsersModule, ProductsModule],
})
export class AppModule {}
