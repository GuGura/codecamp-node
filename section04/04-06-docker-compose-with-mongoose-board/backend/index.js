import express from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import mongoose from "mongoose";
import {Board} from "./models/board.model.js";

import {checkPhone, getToken, sendTokenToSMS} from './phone.js'
import {options} from "./swagger/config.js";
import {getWelcomeTemplate, sendTemplateToEmail, validateEmail} from "./email.js";

const app = express();
app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get('/boards', async (req, res) => {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  // const result = [
  //   {number: 1, write: "철수", title: "제목입니다~~", contents: "내용이에요~~"},
  //   {number: 2, write: "영희", title: "영희입니다~~", contents: "영희이에요~~"},
  //   {number: 3, write: "훈이", title: "훈이입니다~~", contents: "훈이이에요~~"},
  // ]
  const result = await Board.find()
  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 추가
  res.send(result)
})


app.post('/boards', async (req, res) => {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req)
  console.log("====================================");
  console.log(req.body)

  // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정
  const board = new Board({
    write: req.body.write,
    title: req.body.title,
    contents: req.body.contents
  })

  await board.save()

  // 3. DB에 저장된 결과를 브라우저에 응답(response) 추가
  res.send('게시물 등록에 성공하였습니다.')
})

app.post('/tokens/phone', (req, res) => {
  const phone = req.body?.phone
  console.log('phone')
  // 1.휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
  const isValid = checkPhone(phone);
  if (isValid===false) return

  // 2.핸드폰 토큰 6자리 만들기
  const myToken = getToken();

  // 3.핸드폰번호에 토큰 전송하기
  sendTokenToSMS(phone, myToken);

  res.send('휴대폰번호 인증에 성공하였습니다.')
})

app.post('/users', function (req, res) {
  const {name, age, school, email} = req.body;

  const isValid = validateEmail({email})
  if (isValid===false) return

  const template = getWelcomeTemplate({name, age, school});
  sendTemplateToEmail(email, template);
  res.send('이메일 전송에 성공하였습니다.')
})


mongoose.connect('mongodb://my-database/mydocker')
        .then(() => console.log('db 접속에 성공하셨습니다.'))
        .catch(() => console.log('db 접속에 실패하셨습니다.'))
app.listen(4000, () => {
  console.log(`Example app listening on port 4000`)
})
