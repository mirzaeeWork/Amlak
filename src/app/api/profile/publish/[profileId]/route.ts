import { GET } from "@/app/api/auth/[...nextauth]/route";
import UserModel from "@/models/User";
import ProfileModel from "@/models/profile";
import { getProfileErrorResponse, getProfileSuccessResponse, getUserErrorResponse } from "@/utils/HandleMessage";
import { UserSession } from "@/utils/Type-Interface";
import connectDB from "@/utils/connectDB";
import { ProfileResponseMessages, UserResponseMessages } from "@/utils/constans";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"

type profileIDType = {
    params: {
        profileId: string;
    };
};


export async function PATCH(req: NextRequest, { params }: profileIDType) {
    try {
        await connectDB()
        const _id = params.profileId
        if (!Types.ObjectId.isValid(_id)) return NextResponse.json(getProfileErrorResponse("", ProfileResponseMessages.ERROR_ID))

        const session: UserSession | null = await getServerSession(GET)
        if (!session) return NextResponse.json(getUserErrorResponse("", UserResponseMessages.NOT_FOUND))

        const user = await UserModel.findOne({ email: session.user.email })
        if (!user) return NextResponse.json(getUserErrorResponse("", UserResponseMessages.NOT_FOUND))

        if (user.role != "ADMIN") return NextResponse.json(getUserErrorResponse("", UserResponseMessages.ERROR_ADMIN))

        const profile = await ProfileModel.findOneAndUpdate({ _id }, { published: true })
        if (!profile) return NextResponse.json(getProfileErrorResponse("", ProfileResponseMessages.NOT_FOUND))

        return NextResponse.json(getProfileSuccessResponse(
            [profile],
            ProfileResponseMessages.PUBLISH_UPDATED
        ));

    } catch (error) {
        return NextResponse.json(getProfileErrorResponse(
            (error),
            ProfileResponseMessages.ERROR_DELETING
        ))
    }
}