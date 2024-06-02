// 타입추론
let aaa = '안녕하세요'
aaa = 3;

// 타입명시
let bbb: string = '반갑습니다'
bbb = 10
//알아서 추론해주는데 왜 명시해줘야하냐?

// 타입명시가 필요한 상황
let ccc: number | string = 1000
ccc = "1000원"

// 숫자타입
let ddd: number = 10
ddd = "철수"

// boolean 타입
let eee: boolean = true
eee = false
// js로 실행하면 이 값은 참이다.
// js를 사용하다보면 boolean값이 string으로 변환해서
// 문자열 'false'를 전달하게 되는 경우가 있는데 이 경우 위험하다
eee = 'false'

//falsy
0
""
NaN
null
undefined

" " // 이건 참이다.

// 배열 타입
let fff:number[] = [1,2,3,4,5,"인냥하세요"];
let ggg:string[] = ['철수','영희','훈이',10];
let hhh: (string | number)[] = ['철수','영희','훈이',10];
