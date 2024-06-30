import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ): Promise<Product> {
    // << 브라우저에 결과 보내주는 2가지 방법 >>

    // 1. 등록된 내용이 담긴 객체를 그대로 브라우저에 돌려보내주기
    // 보통은 1번 방법을 사용한다. 왜냐하면 등록된 결과를 바로 확인할 수 있기 때문이다.
    // 2번 방법은 등록된 결과를 확인하기 위해 API를 다시 호출해야 하기 때문에 번거롭다.
    return this.productsService.create({ createProductInput });

    // 2. 결과메세지만 간단히 보내주기
    // return 'Product created!';
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string, //
    @Args('updateProductInput') updateProductInput: UpdateProductInput, //
  ): Promise<Product> {
    return this.productsService.update({
      productId, //
      updateProductInput,
    });
  }
}
