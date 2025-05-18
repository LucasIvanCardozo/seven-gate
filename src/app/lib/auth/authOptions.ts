import { login } from "@/app/lib/users"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
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
        async jwt({ token, user }) {
            if (user) {
                const { id: sub, ...rest } = user

                token = {
                    ...token,
                    sub,
                    ...rest,
                }
            }
            return token
        },
        async session({ session, token }) {
            const { sub, ...rest } = token

            if (!sub) throw new Error("Not sub found")

            session.user = {
                // @ts-ignore
                id: `${sub}`,
                ...rest,
            }

            return session
        },
    },
    session: {
        strategy: "jwt",
    } as const,
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}
