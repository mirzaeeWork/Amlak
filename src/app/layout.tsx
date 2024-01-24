import type { Metadata } from 'next'
import './globals.css'
import { localMyFonts } from '@/utils/fonts'
import Layout from '@/components/layout/Layout'
import NextAuthProviders from '@/providers/NextAuthProviders'


export const metadata: Metadata = {
  title: 'املاک',
  description: 'سایت خرید و فروش املاک',
  icons:{icon:"./favicon.ico"},
  
}

type rootType = {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: rootType) {
  return (
    <html lang="fa" dir="rtl">
      <body className={localMyFonts.className}>
        <NextAuthProviders>
          <Layout>
            {children}
          </Layout>
        </NextAuthProviders>
      </body>
    </html>
  )
}
