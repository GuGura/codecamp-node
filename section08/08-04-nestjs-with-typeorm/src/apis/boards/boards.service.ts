import { Injectable, Scope } from '@nestjs/common';

/*
@Injectable() 있으나 없으나 module에서 providers에 추가함으로써
싱글톤 적용되서 상관없음.
 */

/* 인젝션-스코프 -> 1. 싱글톤(new 한번)으로할래 말래?
                2. Request 스코프(매 요청마다 new)로 할래?
                3. Transaction 스코프(매 주입마다 new)로 할래?*/
@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  qqq(): string {
    return 'Hello World!';
  }
}
