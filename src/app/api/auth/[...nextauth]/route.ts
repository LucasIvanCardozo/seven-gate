import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
import { login } from "../../users/login.user"

const authOptions = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password)
                    throw new Error("Email and password are required")

                return login(credentials)
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: any }) {
            if (user) token.sub = user.id

            return token
        },
        async session({ session, token }: { session: any; token: JWT }) {
            session.user.id = token.id
            return session
        },
    },
    session: {
        strategy: "jwt",
    } as const,
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
} as any)

export { authOptions as GET, authOptions as POST }
