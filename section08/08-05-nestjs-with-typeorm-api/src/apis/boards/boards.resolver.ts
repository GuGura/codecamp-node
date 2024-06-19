import { BoardsService } from './boards.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [Board], { nullable: true })
  fetchBoards(): Board[] {
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    @Args('writer') writer: string,
    @Args('title') title: string,
    @Args('contents') contents: string,
  ): string {
    return this.boardsService.create(writer, title, contents);
  }
}
