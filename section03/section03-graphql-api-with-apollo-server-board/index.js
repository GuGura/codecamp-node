import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    phone: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        fetchBoards: (parent, args, context, info) => {
            // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
            const result = [
                { number: 1, write: "철수", title: "제목입니다~~", contents: "내용이에요~~" },
                { number: 2, write: "영희", title: "영희입니다~~", contents: "영희이에요~~" },
                { number: 3, write: "훈이", title: "훈이입니다~~", contents: "훈이이에요~~" },
            ]
            // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 추가
            return result
        },
    },
    Mutation: {
        createBoard: (parent, args, context, info) => {
            // 1. 브라우저에서 보내준 데이터 확인하기
            console.log(args)
            console.log("====================================");
            console.log(args.body)

            // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정


            // 3. DB에 저장된 결과를 브라우저에 응답(response) 추가
            return '게시물 등록에 성공하였습니다.'
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: true, // 모든 사이트 허용 할때
    // cors: {origin: ['https://naver.com', 'https://daum.net'],}  특정사이트만 지정하고 싶을 때
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
