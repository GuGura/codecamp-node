import { Module } from '@nestjs/common';

import { BoardsModule } from './apis/boards/boards.module';
import { UsersModule } from './apis/users/users.module';
import { ProductsModule } from './apis/products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    BoardsModule,
    UsersModule,
    ProductsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
  ],
})
export class AppModule {}
