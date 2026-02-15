import NextAuth, {type NextAuthOptions} from "next-auth"
import { PrismaAdapter} from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",  
  },
 
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email", placeholder: "Enter your email"},
        password: {label: "Password", type: "password", placeholder: "Enter your password"},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
        include: {roles: true},
      });

      if (!user) {
        return null
      }
      if (!user.password) {
        return null
      }

      const ok = await bcrypt.compare(credentials.password, user.password)
      if (!ok) {
        return null
      }

      return{
        id: user.id,
        email: user.email,
        name: user.name ?? user.email.split("@")[0],
        roles: user.roles.map((r:any) => r.role),
      }as any
    }})
  ],
  callbacks:{
    async jwt({token, user}) {
      if(user){
        ;(token as any).roles = (user as any).roles ?? []
      }
      return token
    },
    async session({session, token}) {
      (session as any).user.roles = (token as any).roles ?? []
      return session
    },
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }