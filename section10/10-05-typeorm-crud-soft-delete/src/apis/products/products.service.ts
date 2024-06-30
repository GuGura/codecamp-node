import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCheckSoldOut,
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
  ) {}

  findAll(): Promise<Product[]> {
    // 2. 소프트 삭제 isDeleted 문제 / 언제삭제 되었는지 알 수 없다
    // return this.productsRepository.find({ where: { isDelete: false } });

    /* 3. 소프트 삭제 deletedAt 문제 / deletedAt: null 을  추가하지 않으면 삭제된 데이터를 조회할 수 없다.
       실수가 발생할 수 있으므로, 이 방법은 굉장히 부담스럽다.*/
    // return this.productsRepository.find({ where: {deletedAt: null});
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    // 2. 소프트 삭제 isDeleted 문제 / 언제삭제 되었는지 알 수 없다.
    // return this.productsRepository.findOne({
    //   where: {
    //     id: productId,
    //     isDeleted: false,
    //   },
    // });

    /* 3. 소프트 삭제 deletedAt 문제 / deletedAt: null 을  추가하지 않으면 삭제된 데이터를 조회할 수 없다.
       실수가 발생할 수 있으므로, 이 방법은 굉장히 부담스럽다.*/
    // return this.productsRepository.findOne({
    //   where: {
    //     id: productId,
    //     deletedAt: null,
    //   },
    // });
    return this.productsRepository.findOne({
      where: {
        id: productId,
      },
    });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput,
      // 하나 하나 직접 나열하는 방식
      // name: '마우스',
      // description: '좋은 마우스',
      // price: 3000,
    });

    // result 안에는 무엇이 있을까?
    // result = {
    //  id: uuid,
    //  name: '마우스',
    //  description: '좋은 마우스',
    //  price: 3000,
    // }

    return result;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // 기존 있는 내용을 재사용하여, 로직을 통일하자!!
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 하자!!
    this.checkSoldOut({ product });
    // const product = await this.productsRepository.findOne({
    //   where: { id: productId },
    // });

    // this.productsRepository.create(); // DB 접속이랑 관련 없음. 등록을 위한 값이 비어있는 객체 생성
    // this.productsRepository.insert(); // 등록하고 결과를 반환 받지 않음
    // this.productsRepository.update(); // 업데이트하고 결과를 반환 받지 않음

    const result = this.productsRepository.save({
      ...product, // 수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 반환 받고 싶을 때
      ...updateProductInput, // 스프레드 문법을 사용하여 객체를 합칠 수 있다.
    });

    return result;
  }

  // checkSoldOut 함수로 만드는 이유 => 수정시, 삭제시 등 같은 검증 로직 사용
  checkSoldOut({ product }: IProductsServiceCheckSoldOut) {
    if (product.isSoldOut) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldOut) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 진짜 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false; // affected는 영향을 받은 행의 수를 반환

    // 2. 소프트 삭제(직접 구현) - isDeleted 컬럼을 추가하여 삭제 여부를 판단
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제(직접 구현) - deleteAt 컬럼을 추가하여 삭제 시간을 기록, 기본값을 비워두고 시간이 기록되면 삭제로 판단
    // this.productsRepository.update({ id: productId }, { deletedAt: new Date() });

    /* 4. 소프트 삭제(TypeORM 제공) - sortRemove
        단점: ID로만 삭제 가능
        장점: 여러 ID 한번에 삭제 가능  .softRemove({id:qqq } ,{ id:www }, { id:eee } , { id:rrr } );
    * */
    // this.productsRepository.softRemove({ id: productId });

    /* 5. 소프트 삭제(TypeORM 제공) - sortDelete
        단점: 여러 ID 한번에 못지움.
        장점: 다른 컬럼으로 삭제 가능.
    * */
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
