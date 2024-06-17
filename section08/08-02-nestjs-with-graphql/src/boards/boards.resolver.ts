import { BoardsService } from './boards.service';

// @Controller()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  // @Get('/products/buy')
  getHello(): string {
    return this.boardsService.qqq();
  }
}
