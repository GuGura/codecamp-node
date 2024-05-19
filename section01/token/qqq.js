console.log('안녕하세여!!');

function getToken(){
    const token = Math.random().toString(36).slice(2,10);
    console.log(token)
}

getToken();