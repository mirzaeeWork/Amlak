import ProfileDetailsPage from '@/components/template/ProfileDetailsPage';
import { GetProfile, GetUser } from '@/utils/getInfo';
import { Metadata } from 'next';
import React from 'react'

type profileIDType = {
  params: {
    profileId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined }

};

//برای تگ هد و سئو می باشد
export async function generateMetadata(
  { params, searchParams }: profileIDType,
): Promise<Metadata> {
  // read route params
  const profileId = params.profileId

  const profile = await GetProfile(profileId)

  if (!profile) {
    // Handle the case when profile is null or undefined
    return {
      title: 'Default Title',
      description: 'Default Description',
      authors: { name: 'Default Author' },
      other: { price: 0, location: 'Default Location' }
    };
  }

  return {
    title: profile.title,
    description: profile.description,
    authors: { name: profile.realState },
    other: { price: profile.price as number, location: profile.location as string }
  }
}

// function ProfileDetails(props){
// console.log(props)
async function ProfileDetails({ params: { profileId } }: profileIDType) {
  // console.log(profileId)
  const profile = await GetProfile(profileId)
  // console.log(profile)
  if (!profile) return <h3>مشکلی پیش آمده است لطفا دوباره امتحان کنید</h3>

  const user = await GetUser()
  if (!user) return <h3>مشکلی پیش آمده است</h3>


  return <ProfileDetailsPage profile={JSON.parse(JSON.stringify(profile))} getRole={user.role == "ADMIN" ? true : false} />
}

export default ProfileDetails