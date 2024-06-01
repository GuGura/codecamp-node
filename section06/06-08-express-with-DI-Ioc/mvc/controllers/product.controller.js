export class ProductController {
    cashService;
    productService;

    constructor(cashService, productService) {
        this.cashService = cashService;
        this.productService = productService;
    }

    buyProduct = (req, res) => {
        // 1. 가진돈을 검증하는 코드 (대략 10줄 => 2줄 => 1줄)
        // const cashService = new CashService();
        const hasBalance = this.cashService.checkValue()

        if (!hasBalance) {
            res.send('돈이 부족합니다.');
            return;
        }
        // 2. 판매여부를 검증하는 코드 (대략 10줄 => 2줄 => 1줄)
        // const productService = new ProductService();
        const isSoldOut = this.productService.checkSoldOut()

        if (isSoldOut) {
            res.send('상품이 품절되었습니다.');
            return;
        }

        // 3. 상품을 구매하는 코드 (대략 10줄 정도)
        res.send('상품 구매 완료!!')
    }

    refundProduct = (req, res) => {
        // 1. 판매여부를 검증하는 코드 (대략 10줄 정도 => 2줄 => 1줄)
        // const productService = new ProductService();
        const isSoldOut = this.productService.checkSoldOut()

        if (!isSoldOut) {
            res.send('환불할 상품이 없습니다.');
            return;

        }
        // 2. 상품 환불하는 코드
        res.send('상품 환불 완료!!')
    }
}
