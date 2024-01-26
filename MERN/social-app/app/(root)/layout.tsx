import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import LeftSideBar from '@/components/layout/LeftSideBar' // Renamed import
import MainContainer from '@/components/layout/MainContainer'
import RightSideBar from '@/components/layout/RightSideBar' // Renamed import
import Topbar from '@/components/layout/Topbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${inter.className} bg-purple-2`}>
          <LeftSideBar />
          <MainContainer>
            <Topbar />
            {children}
          </MainContainer>
          <RightSideBar />
        </body>
      </html>
    </ClerkProvider>
  )
}