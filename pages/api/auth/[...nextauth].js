import { connectDB } from "../../../util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import NaverProvider from "next-auth/providers/naver"
import KakaoProvider from 'next-auth/providers/kakao'

const naverCustomProvider = NaverProvider({
    clientId: '068Hk85bqO4PM09SBBO5',
    clientSecret: 'GCBq0Lelyd',
  });
const kakaorCustomProvider = KakaoProvider({
    clientId: '949e5a00a509e3c49b3cc6e13df93da0',
    clientSecret: 'FSMaHdGQcSgD4wmBXj9hYZejgiqLfPVt',
  });
  kakaorCustomProvider.style={
    
    bg:'yellow',

  }
  
  naverCustomProvider.style = {
    logo: 'https://logoproject.naver.com/favicon.ico',
    logoDark: 'https://logoproject.naver.com/favicon.ico',
    bgDark: '#2DB400',
    bg: '#2DB400',
    text: '#FFFFFF',
    textDark: '#FFFFFF',
  };


export const authOptions = {
    providers: [
        GithubProvider({
            clientId: '4382d267cbf215f4d86a',
            clientSecret: '39087d0c70095c4f68a961c706adcd8254bf3cfd',
        }),
        naverCustomProvider,
        kakaorCustomProvider,
        CredentialsProvider({
            //1. 로그인페이지 폼 자동생성해주는 코드 
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },

            //2. 로그인요청시 실행되는코드
            //직접 DB에서 아이디,비번 비교하고 
            //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
            async authorize(credentials) {
                let db = (await connectDB).db('nextforum');
                let user = await db.collection('user').findOne({ userid: credentials.email })
                if (!user) {
                    console.log('해당 이메일은 없음');
                    return null
                }
                const pwcheck = await bcrypt.compare(credentials.password, user.password);
                if (!pwcheck) {
                    console.log('비번틀림');
                    return null
                }
                return user
            }
        })

    ],
    session: {
        strategy: 'jwt',
        maxAge:  60 * 60 //하루
    },


    callbacks: {
        //4. jwt 만들 때 실행되는 코드 
        //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = {};
                token.user.name = user.name
                token.user.email = user.email
            }
            return token;
        },
        //5. 유저 세션이 조회될 때 마다 실행되는 코드
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },
    },
    pages: {
        signIn: "/login",
      },

    secret: 'qwer1234',
    adapter: MongoDBAdapter(connectDB)

};
export default NextAuth(authOptions); 