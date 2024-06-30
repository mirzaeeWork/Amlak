import UserModel from "@/models/User"
import connectDB from "@/utils/connectDB"
import { getServerSession } from "next-auth"
import { GET as LocalGET } from "@/app/api/auth/[...nextauth]/route";
import { getProfileErrorResponse, getProfileSuccessResponse, getUserErrorResponse } from "@/utils/HandleMessage"
import { NextRequest, NextResponse } from "next/server"
import { ProfileResponseMessages, UserResponseMessages } from "@/utils/constans"
import { UserSession } from "@/utils/Type-Interface"
import { ProfileSchema } from "@/validation/Schema/profileSchema"
import { Types } from "mongoose"
import ProfileModel from "@/models/profile"

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const searchParams = req.nextUrl.searchParams
    const category = searchParams.get('categoty')

    const filter = category != 'undefined' ? { category,published:true } : {published:true };
    
    const profiles = await ProfileModel.find(filter, { userId: 0 })
    if (!profiles.length) return NextResponse.json(getProfileErrorResponse("", ProfileResponseMessages.NOT_FOUND))

    return NextResponse.json(getProfileSuccessResponse(
      profiles,
      ProfileResponseMessages.CREATED
    ));

  } catch (error) {
    return NextResponse.json(getProfileErrorResponse(
      (error),
      ProfileResponseMessages.ERROR_GET
    ))
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const {
      title,
      description,
      location,
      phone,
      price,
      realState,
      constructionDate,
      category,
      rules,
      amenities
    } = await req.json()

    await ProfileSchema.validate({
      title, description, location, phone, price, realState,
      constructionDate, category, rules, amenities
    }, { abortEarly: false })

    const session: UserSession | null = await getServerSession(LocalGET)
    if (!session) return NextResponse.json(getUserErrorResponse("", UserResponseMessages.NOT_FOUND))

    const existUser = await UserModel.findOne({ email: session.user.email })
    if (!existUser) return NextResponse.json(getUserErrorResponse("", UserResponseMessages.NOT_FOUND))


    const newProfile = await ProfileModel.create({
      title,
      description,
      location,
      phone,
      realState,
      constructionDate,
      amenities,
      rules,
      category,
      price: +price,
      userId: new Types.ObjectId(existUser._id),
    });

    return NextResponse.json(getProfileSuccessResponse(
      [newProfile],
      ProfileResponseMessages.CREATED
    ));
  } catch (error) {
    return NextResponse.json(getProfileErrorResponse(
      (error),
      ProfileResponseMessages.ERROR_CREATING
    ))
  }
}

//استفاده می کنیم PATCH چون نمی خواهیم کل فیلدها تغییر کند از 
export async function PATCH(req: NextRequest) {
  try {
    await connectDB()
    const {
      _id,
      title,
      description,
      location,
      phone,
      price,
      realState,
      constructionDate,
      category,
      rules,
      amenities
    } = await req.json()

    if (!Types.ObjectId.isValid(_id)) return NextResponse.json(getProfileErrorResponse("", ProfileResponseMessages.ERROR_ID))
    await ProfileSchema.validate({
      title, description, location, phone, price, realState,
      constructionDate, category, rules, amenities
    }, { abortEarly: false })

    const session: UserSession | null = await getServerSession(LocalGET)
    if (!session) return NextResponse.json(getUserErrorResponse("", UserResponseMessages.NOT_FOUND))

    const user = await UserModel.findOne({ email: session.user.email })
    if (!user) return NextResponse.json(getUserErrorResponse("", UserResponseMessages.NOT_FOUND))


    const profile = await ProfileModel.findOneAndUpdate({ _id, userId: user._id }, {
      $set: { title, description, location, phone, price: +price, realState, constructionDate, category, rules, amenities }
    });

    if (!profile) return NextResponse.json(getProfileErrorResponse("", ProfileResponseMessages.NOT_FOUND))


    return NextResponse.json(getProfileSuccessResponse(
      [profile],
      ProfileResponseMessages.PUBLISH_UPDATED
    ));

  } catch (error) {
    return NextResponse.json(getProfileErrorResponse(
      (error),
      ProfileResponseMessages.ERROR_UPDATING_BODY
    ))
  }

}