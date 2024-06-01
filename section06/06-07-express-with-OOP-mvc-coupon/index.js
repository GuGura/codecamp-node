import express from 'express'
import {ProductController} from "./mvc/controllers/product.controller.js";

const app = express()
const port = 3000

// 상품 API
const productController = new ProductController();
app.post('/products/buy', productController.buyProduct) // 상품 구매하기 API
app.post('/products/refund', productController.refundProduct) // 상품 환불하기 API

//게시판 API
// app.get("/boards", boardController.getBoards) // 게시판 목록 조회 API
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
