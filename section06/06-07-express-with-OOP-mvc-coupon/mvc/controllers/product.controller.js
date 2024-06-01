import {CashService} from "./services/cash.service.js";
import {ProductService} from "./services/product.service.js";

export class ProductController{
    buyProduct = (req, res) => {
        // 1. 가진돈을 검증하는 코드 (대략 10줄 => 2줄)
        const cashService = new CashService();
        const hasBalance = cashService.checkBalance()

        // 2. 판매여부를 검증하는 코드 (대략 10줄 => 2줄)
        const productService = new ProductService();
        const isSoldOut = productService.checkSoldOut()

        // 3. 상품을 구매하는 코드 (대략 10줄 정도)
        if (hasBalance && !isSoldOut) {
            res.send('상품 구매 완료!!')
        }
    }

    refundProduct = (req, res) => {
        // 1. 판매여부를 검증하는 코드 (대략 10줄 정도)
        const productService = new ProductService();
        const isSoldOut = productService.checkSoldOut()

        // 2. 상품 환불하는 코드
        if (isSoldOut) {
            res.send('상품 환불 완료!!')
        }
    }
}
