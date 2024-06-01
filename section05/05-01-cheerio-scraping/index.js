import * as cheerio from "cheerio";
import axios from "axios";

const createMessage = async () =>{
    // 입력된 메세지: "안녕하세요~ https://www.naver.com 에 방문해 주세요"

    // 1. 입력된 메세지에서 http로 시작하는 문장이 잇는지 먼저 찾기!(.find() 등의 알고리즘 사용하기)
    const url = "https://www.naver.com"

    // 2. axios.get으로 요청해서 html코드 받아오기 => 스크래핑
    const result = await axios.get(url);
    console.log(result.data);

    // 3. 스크래핑 결과에서 OG(Open Graph) 코드를 골라내서 변수에 담기 => cheerio 도움 받기
    const $ = cheerio.load(result.data); //load:불러오다
    $('meta').each((i,el)=>{
        if ($(el).attr('property') && $(el).attr('property').includes('og:')) {
            const key = $(el).attr('property');
            const value = $(el).attr('content');
            console.log(key, value)
        }
    })
}
createMessage();
