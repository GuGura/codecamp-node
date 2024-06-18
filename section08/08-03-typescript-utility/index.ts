interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial 타입
// 전부 ?가 붙는다.
type aaa = Partial<IProfile>;

// 2. Required 타입
// 전부 필수값이 된다.
type bbb = Required<IProfile>;

// 3. Pick 타입
// name, age만 가져온다.
type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
// school를 제외한 나머지를 가져온다.
type ddd = Omit<IProfile, "school">;

// 5. Union 타입
type eee = "철수" | "영희" | "훈이"; // Union 타입
let child1: eee = "영희"; // 철수 or 영희 or 훈이만 가능
let child2: string = "사과"; // 모든 문자열 가능

// 6. Record 타입
// key가 '철수' | '영희' | '훈이'이고 value가 IProfile인 객체를 만든다.
type fff = Record<eee, IProfile>; // Record 타입

// 7. 객체의 key들로 Union 타입 만들기
// keyof 객체에서 key들을 추출해서 Union 타입으로 만든다.
type ggg = keyof IProfile; // 'name' | 'age' | 'school' | 'hobby'
let myProfile: ggg = "age";

// 8. type vs interface 차이 =>  Interface는 선언병합 가능 / Type은 선언병합 불가능
interface IProfile {
  candy: number; // 선언병합으로 추가됨(기존 IProfile에 candy가 없었음)
}
// 9. 배운 것 응용
let profile: Partial<IProfile> = {
  candy: 10,
};
