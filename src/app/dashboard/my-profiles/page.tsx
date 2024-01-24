import { GET } from "@/app/api/auth/[...nextauth]/route";
import MyProfilePage from "@/components/template/MyProfilePage";
import UserModel from "@/models/User";
import ProfileModel from "@/models/profile";
import { UserSession } from "@/utils/Type-Interface";
import { getServerSession } from "next-auth";

async function Myprofiles() {
    const session: UserSession | null = await getServerSession(GET);

    const [user]=await UserModel.aggregate([{
        $match:{
            email:session?.user.email            
        }
    },{
        $lookup:{
            from:ProfileModel.collection.name,
            foreignField:"userId",
            localField:"_id",
            as:"profiles"
        }
    }])
  return <MyProfilePage profiles={user.profiles}/>
}

export default Myprofiles