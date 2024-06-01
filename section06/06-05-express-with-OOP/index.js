import express from 'express'
import {CashService} from './cash.js';
import {ProductService} from './product.js';

const app = express()
const port = 3000

// 상품 구매하기 API
app.post('/products/buy', (req, res) => {
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
})

// 상품 환불하기 API
app.post('/products/refund', (req, res) => {
  // 1. 판매여부를 검증하는 코드 (대략 10줄 정도)
  const productService = new ProductService();
  const isSoldOut = productService.checkSoldOut()

  // 2. 상품 환불하는 코드
  if (isSoldOut) {
    res.send('상품 환불 완료!!')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
