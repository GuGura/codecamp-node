


function createUser({name, age, school, email, createdAt}){
    const isValid = validateEmail({email})
    if(isValid === false) return

    const template = getSignUpTemplate({name, age, school, createdAt});
    sendTemplateToEmail(email, template);
}


function validateEmail({email}){
    return !(email.includes('@')===false || !email);
}

function getSignUpTemplate({name, age, school, createdAt}){
    return `
    <html>
        <body>
            <h1>${name}님 가입을 환영합니다!!</h1>
            <hr/>
            <div>이름: ${name}</div>
            <div>나이: ${age}</div>
            <div>학교: ${school}</div>
            <div>가입일: ${createdAt}</div>
        </bodY>
    </html>`
}

function sendTemplateToEmail(myemail, template){
    console.log(myemail +'이메일로 가입환영템플릿 ' + template +"를 전송합니다.");
}

const obj ={
    name:'철수',
    age:8,
    school:'다람쥐초등학교',
    email:'a@a.com',
    createdAt: getToday()
}

function getToday(){
    const date = new Date();

    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2,'0')}-${date.getDay().toString().padStart(2,'0')}`
}

createUser(obj);
