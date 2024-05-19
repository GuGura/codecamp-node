import CoolsmsMessageService from "coolsms-node-sdk";
import {raw} from "express";


export function checkPhone(phone) {
    if (phone.length < 10 || phone.length > 11) {
        throw new Error('phone invalid')
    }
    return true
}

export function getToken() {
    return Math.random().toString(36).slice(2,9);
}

export async function sendTokenToSMS(phone, result) {
    try {
        const mysms = CoolsmsMessageService.default;
        const messageService = new mysms(process.env.COOLMSM_API_KEY, process.env.COOLMSM_API_SECRET);
        console.log('phone:', phone)
        const res = await messageService.sendOne({
            to: phone,
            from: '01046350223',
            text: '인증번호는 ' + result + '입니다.',
            type: 'SMS'
        })
        console.log(res)
        console.log(phone + '번호로 인증번호 ' + result + "를 전송합니다.");
    } catch (e) {
        console.log(e);
    }
}
