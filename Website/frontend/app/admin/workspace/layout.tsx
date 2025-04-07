import NavigationBar from '@/components/Navbar/NavigationBar'
import Pr from '@/app/_trpc/TRPCProvider'
import { Poppins } from 'next/font/google'
import { Suspense } from 'react'
import ApiProvider from '@/api/ApiProvider'

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['devanagari'],
    preload: true,
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ApiProvider>
            <NavigationBar />
            <div className={poppins.className}>{children}</div>
        </ApiProvider>
    )
}
