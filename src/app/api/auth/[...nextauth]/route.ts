import UserModel from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { signupSchema } from "@/validation/Schema/userSchema";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"


const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: { },
            async authorize(credentials){
                const { email, password } = credentials as Record<"email" | "password", string>;

                await connectDB()
                try {
                    await signupSchema.validate({ email, password }, { abortEarly: false })
                } catch (error) {
                    throw new Error("Invalid data")
                }
                const existUser = await UserModel.findOne({ email })
                if (!existUser) throw new Error("User doesn't exist!")

                const isValid = await verifyPassword(password, existUser.password)
                if (!isValid) throw new Error("Email or password is incorrect!")
                const user = { id: existUser._id.toString(),email };
                return user
            },
        }),
    ],
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }