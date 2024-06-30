import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCheckSoldOut,
  IProductsServiceCreate,
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
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
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
}
