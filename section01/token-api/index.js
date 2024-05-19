function createTokenOfPhone(phone){
    // 1. 휴대폰번호 자릿수 맞는지 확인(10~11자리)'

    if(phone.length < 10 || phone.length > 11){
        throw new Error('phone invalid')
    }

    // 2. 핸드폰 토큰 6자리 만들기
    const token = Math.random().toString(36).slice(2,9);

    return token;
}

const token = createTokenOfPhone('01046350223');
console.log(token);