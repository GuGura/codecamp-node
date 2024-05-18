function createTokenOfPhone(phone){
    checkPhone(phone);
    const token = getToken();
    sendTokenToSMS(phone, token);
}

createTokenOfPhone('01046350223');

export function checkPhone(phone){
    if(phone.length < 10 || phone.length > 11){
        throw new Error('phone invalid')
    }
    return true
}

export function getToken(){
    return Math.random().toString(36).slice(2,9);
}

export function sendTokenToSMS(phone, result){
    console.log(phone+ '번호로 인증번호 '+ result + "를 전송합니다.");
}
