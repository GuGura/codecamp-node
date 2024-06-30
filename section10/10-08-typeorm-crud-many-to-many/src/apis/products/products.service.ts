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
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSalesLocations.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
    private readonly productsSalesLocationsService: ProductsSalesLocationsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSalesLocations', 'productCategory'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSalesLocations', 'productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 2. 상품과 상품거래위치를 같이 등록하는 방법
    const { productSalesLocation, productCategoryId, ...product } =
      createProductInput;

    // 분리 안하면 문제점 : productSalesLocation에 데이터를 저장할 때 로직들이 통일이 안됨. if문으로 매번 다르게 검증을 해야함.
    // 저장뿐만 아니라 검증도 중요하다. 그래서 service에 로직을 분리함.
    const result = await this.productsSalesLocationsService.create({
      productSalesLocation,
    });
    const result2 = this.productsRepository.save({
      ...product,
      // result 통째로 넣기 vs id만 빼서 넣기(id만 넣으면, 다른 정보를 조회할 수 없음)
      productSalesLocations: { ...result },
      productCategory: {
        id: productCategoryId,
      },
    });
    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // 기존 있는 내용을 재사용하여, 로직을 통일하자!!
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 하자!!
    this.checkSoldOut({ product });

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
