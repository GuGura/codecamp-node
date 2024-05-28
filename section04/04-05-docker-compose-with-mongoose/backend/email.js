import {getToday} from './util.js'
import nodemailer from 'nodemailer';
import {raw} from "express";

export function validateEmail({email}){
    return !(email.includes('@')===false || !email);
}
export function getWelcomeTemplate({name, age, school}){
    return `
    <html lang="ko">
        <body>
            <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 500px;">
                    <h1>${name}님 가입을 환영합니다!!</h1>
                    <hr/>
                    <div style="color: red;">이름: ${name}</div>
                    <div>나이: ${age}</div>
                    <div>학교: ${school}</div>
                    <div>가입일: ${getToday()}</div>
                </div>
            </div>
        </bodY>
    </html>`
}


export function sendTemplateToEmail(myEmail, template){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        service: 'gmail',
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "wodus331@gmail.com",
            pass: "gknfwnuzutbdwtcv",
        },
    });
    const info = transporter.sendMail({
        from: 'wodus331@gmail.com', // sender address
        to: myEmail, // list of receivers
        subject: "[킹재연 아카데미] 가입을 축하합니다!!", // Subject line
        html: template, // html body
    })
    console.log(info)
}
