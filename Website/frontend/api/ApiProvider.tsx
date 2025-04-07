'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const ApiProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient()
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </div>
    )
}

export default ApiProvider
