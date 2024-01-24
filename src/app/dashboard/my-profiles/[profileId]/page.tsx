import AddProfilePage from "@/components/template/AddProfilePage";
import { GetProfile } from "@/utils/getInfo";

type profileIDType = {
  params: {
      profileId: string;
  };
};

async function EditProfile({ params:{profileId} }: profileIDType) {

  const profile=await GetProfile(profileId)
  if(!profileId) return <h3>مشکلی پیش آمده است لطفا دوباره امتحان کنید</h3>
  return (
    <AddProfilePage profile={JSON.parse(JSON.stringify(profile))}/> 
  )
}

export default EditProfile