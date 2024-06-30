import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
// nextJS에서 제공해주고 있어서 직접 만들 필요는 없다.
// interface IHttpExceptionFilter {
//   qqq(): void;
// }
//
// export class HttpExceptionFilter implements IHttpExceptionFilter {
//   qqq() {
//     console.log('qqq');
//   }
// }

// HttpException Error 가 발생하면, 이곳에서 처리하겠다.
// Catch 데코레이터의 인자에 따라 처리할 수 있는 에러가 달라진다.
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus(); // 몇번 에러인지
    const response = exception.message; // 에러 메시지

    console.log('=====================');
    console.log('status', status);
    console.log('response', response);
    console.log('=====================');
  }
}
