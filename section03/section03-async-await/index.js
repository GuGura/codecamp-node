import axios from "axios";

// 1. 비동기방식
function fetchAsync() {
    const result = axios.get('https://koreanjson.com/posts/1')
    console.log('비동기방식::',result) // Promise { <pending> }
}

// 2. 동기방식
async function fetchSync() {
    const result = await axios.get('https://koreanjson.com/posts/1')
    console.log('동기방식::',result.data) // 제대로된 결과 => {data: {…}, status: 200, statusText: "", headers: {…}, config: {…}, …}
}

fetchAsync()
fetchSync()
