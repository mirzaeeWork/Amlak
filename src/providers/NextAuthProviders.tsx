"use client" //چون فقط می خواهیم این قسمت کلاینت سایت باشد یک فایل جداگانه نوشتیم

import { SessionProvider } from "next-auth/react";

type Props = {
    children?: React.ReactNode;
  };

function NextAuthProviders({ children }: Props) {
  return (
     <SessionProvider>{children}</SessionProvider>
  )
}

export default NextAuthProviders