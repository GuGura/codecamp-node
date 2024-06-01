export class CouponController {
    cashService;

    constructor(cashService) {
        this.cashService = cashService;
    }

    buyCoupon = (req, res) => {
        // 1. 가진돈을 검증하는 코드 (대략 10줄 => 2줄 => 1줄)
        // const cashService = new CashService();
        const hasBalance = this.cashService.checkValue()

        // 2. 상품권 구매하는 코드
        if (!hasBalance) {
            res.send('돈이 부족합니다.');
            return;
        }

        res.send('쿠폰 구매 완료');
    }
}
