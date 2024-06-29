import { Module } from '@nestjs/common';

import { BoardsModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './apis/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    BoardsModule,
    // UsersModule,
    ProductsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST, // docker로 진행할땐 name relation으로 연결할 수 있기에 docker 이름을 적으면 된다.
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'], // __dirname: 현재 디렉토리
      synchronize: true, // 동기화 시켜줘
      logging: true, // ORM이 원시Query로 매핑되서 실행되는데 그 원시Query 노출 여부
    }),
  ],
})
export class AppModule {}
