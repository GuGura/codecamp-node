import {getToday} from './util.js'
export function validateEmail({email}){
    return !(email.includes('@')===false || !email);
}
export function getWelcomeTemplate({name, age, school}){
    return `
    <html lang="ko">
        <body>
            <h1>${name}님 가입을 환영합니다!!</h1>
            <hr/>
            <div>이름: ${name}</div>
            <div>나이: ${age}</div>
            <div>학교: ${school}</div>
            <div>가입일: ${getToday()}</div>
        </bodY>
    </html>`
}

export function sendTemplateToEmail(myEmail, template){


    // console.log(myEmail +'이메일로 가입환영템플릿 ' + template +"를 전송합니다.");
}
