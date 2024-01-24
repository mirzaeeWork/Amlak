import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import SignUpPage from "@/components/template/SignupPage";
import { GET } from "@/app/api/auth/[...nextauth]/route";

async function SignUp() {
  //Server Side  به روش  session گرفتن اطلاعات
  //http://localhost:3000/signup
  const session = await getServerSession(GET);
  // console.log(session)
  if (session) redirect("/")

  return (
    <SignUpPage />
  )
}

export default SignUp