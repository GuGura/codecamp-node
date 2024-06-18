// 1. 문자/숫자/불린 기본타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};
const result1 = getPrimitive("철수", 123, true);

//
//
// 2. any 타입(자바스크립트랑 동일)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); //any는 아무거나 다됨(boolean 값일 경우 참사남)
  return [arg3, arg2, arg1];
};
const result2 = getAny("철수", 123, true);
//
//
// 3. unknown 타입
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") {
    console.log(arg1 + 100);
  }
  console.log(arg1 + 100); // arg1 타입 체크안하면  + 100 시 에러남(any보다는 안전)
  return [arg3, arg2, arg1];
};
const result3 = getUnknown("철수", 123, true);

//
//
// 4. generic 타입 - 1
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}
// Any처럼 뭘 넣어도 되지만 result4 에 타입추정이 됨
const result4 = getGeneric("철수", 123, true);
// <>에 타입을 넣으면 해당 타입으로 강제됨
const result5 = getGeneric<string, number, boolean>("철수", 123, true);
//
//
// 4. generic 타입 - 2
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}
// <>에 타입을 넣으면 해당 타입으로 강제됨
const result6 = getGeneric2<string, number, boolean>("철수", 123, true);
//
//
// 4. generic 타입 - 3
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}
// <>에 타입을 넣으면 해당 타입으로 강제됨
const result7 = getGeneric3<string, number, boolean>("철수", 123, true);
//
//
// 4. generic 타입 - 4
const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};
// <>에 타입을 넣으면 해당 타입으로 강제됨
const result8 = getGeneric4<string, number, boolean>("철수", 123, true);
