import { getServerSession } from "next-auth";
import { UserSession } from "./Type-Interface";
import connectDB from "./connectDB";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserModel from "@/models/User";
import ProfileModel from "@/models/profile";
import { MongoProfile } from '@/utils/Type-Interface'



export async function GetUser(){
    await connectDB()
    const session: UserSession | null = await getServerSession(GET)
    if (!session) redirect("/signin");
  
    const user=await UserModel.findOne({email:session?.user.email})
    return user;
}

export async function GetProfile(profileId: string){
    await connectDB()
    const profile=await ProfileModel.findOne({_id:profileId})
    return profile;
}

export async function GetProfilesUnPublished():Promise<MongoProfile[] | undefined> {
    await connectDB()
    const profiles=await ProfileModel.find({published:false}) as MongoProfile[] | undefined;
    return profiles;
}