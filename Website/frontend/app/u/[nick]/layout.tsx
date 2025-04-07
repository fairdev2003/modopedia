'use client'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import ApiProvider from '@/api/ApiProvider'
import NavigationBar from '@/components/Navbar/NavigationBar'

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
        <html lang="en">
            <ApiProvider>
                <NavigationBar />
                <div className={poppins.className}>{children}</div>
            </ApiProvider>
        </html>
    )
}
