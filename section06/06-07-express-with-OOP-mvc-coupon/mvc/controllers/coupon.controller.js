import {CashService} from "./services/cash.service.js";

export class CouponController {
    buyCoupon = (req, res) => {
        // 1. 가진돈을 검증하는 코드 (대략 10줄 => 2줄)
        const cashService = new CashService();
        const hasBalance = cashService.checkBalance()

        // 2. 상품권 구매하는 코드
        if (!hasBalance) {
            res.send('돈이 부족합니다.');
            return;
        }
        
        res.send('쿠폰 구매 완료');
    }
}
