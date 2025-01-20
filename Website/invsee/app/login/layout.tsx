import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import NavigationBar from '@/components/Navbar/NavigationBar'
import ApiProvider from '@/api/ApiProvider'

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['devanagari'],
    preload: true,
})

export const metadata: Metadata = {
    title: 'Login',
    description: 'You can log in here!',
}

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
