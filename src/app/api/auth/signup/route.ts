import UserModel from "@/models/User";
import { getUserErrorResponse, getUserSuccessResponse } from "@/utils/HandleMessage";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { UserResponseMessages } from "@/utils/constans";
import { signupSchema } from "@/validation/Schema/userSchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { email, password } = await req.json()
    await signupSchema.validate({ email, password }, { abortEarly: false })

    const existUser = await UserModel.findOne({ email })
    if (existUser) return NextResponse.json(getUserErrorResponse("", UserResponseMessages.ERROR_EXIST))

    const hashedPassword = await hashPassword(password)

    const createdUser = await UserModel.create({ email, password: hashedPassword });

    return NextResponse.json(getUserSuccessResponse(
      createdUser,
      UserResponseMessages.CREATED
    ));

  } catch (error) {
    return NextResponse.json(getUserErrorResponse(
      (error),
      UserResponseMessages.ERROR_CREATING
    ))
  }
}
