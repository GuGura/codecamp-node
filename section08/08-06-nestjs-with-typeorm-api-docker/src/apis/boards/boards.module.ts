import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './boards.resolver';

@Module({
  imports: [],
  providers: [BoardsResolver, BoardsService],
})
export class BoardsModule {}
