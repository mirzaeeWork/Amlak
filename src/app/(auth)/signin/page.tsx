import SigninPage from '@/components/template/SignInPage'
import { getServerSession } from "next-auth";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';


//وقتی یک پوشه که نام آن پرانتز داشت برای گروه بندی هست
//و داخل لینک قرار داده نمیشه فقط برای دسته بندی هست

async function SignIn() {
  //Server Side  به روش  session گرفتن اطلاعات
  //تعریف کنیم .env را در فایل  NEXTAUTH_URL و  NEXTAUTH_SECRET  حتما بایستی متغیرهای 
  //NEXTAUTH_SECRET ==>هر مقدار رشته ای می تواند باشد وبهتر هست به صورت هش شده باشد 
  //NEXTAUTH_URL==>لینک اصلی برنامه
  //کنیم run بعد از تعریف این دو متغیر بایستی یک بار دیگر برنامه را از اول
  const session = await getServerSession(GET);
  //  بعد از وصل شدن لینک زیر را وارد کنید اطلاعات نشان داده می شود
  //http://localhost:3000/signin ==>در ترمینال آورده می شود  session توسط خط زیر اطلاعات  
  // console.log(session);

  if (session) redirect("/")
  
  return (
    <SigninPage/>
  )
}

export default SignIn