'use client'

import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/user_store'
import Mainpage from '@/app/admin/workspace/(components)/(workspaces)/Mainpage'
import Loading from '@/app/admin/workspace/(components)/Loading'
import ApiClient from '@/api/fetchClient'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { GoodServerResponse, Options } from '@/types/types'
import Cookies from 'js-cookie'

const Page = () => {
    const { account_data } = useUserStore()
    const [permission, setPermission] = useState<boolean | undefined>(false)

    const checkAdmin = useMutation<
        AxiosResponse<GoodServerResponse<Options>>,
        AxiosError,
        string
    >({
        mutationFn: (userId: string) =>
            ApiClient.get(`/admin/user/verify?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }),
        onSuccess: (data: AxiosResponse<GoodServerResponse<Options>>) => {
            const isAdmin = data?.data?.options?.perms?.isAdmin
            if (typeof isAdmin === 'boolean') {
                setPermission(isAdmin)
            } else {
                console.error(
                    'Invalid response structure: "isAdmin" is undefined.'
                )
            }
        },

        onError: (error: AxiosError) => {
            console.error('Error verifying admin status:', error.message)
        },
    })

    useEffect(() => {
        if (account_data) {
            checkAdmin.mutate(account_data.userId)
        }
    }, [account_data])

    return (
        <div className="lg:mx-[20%] mx-[5%] flex flex-col">
            {checkAdmin.isError && <div className="text-white">Erorr</div>}
            {checkAdmin.isLoading && <Loading />}
            {permission && <Mainpage></Mainpage>}
        </div>
    )
}

export default Page
