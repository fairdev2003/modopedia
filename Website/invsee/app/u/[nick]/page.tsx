'use client'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { usePersistStore } from '@/stores/persist_store'
import { AccessPower, ErrorServerResponse, UserType } from '@/types/types'
import DashboardError from '@/app/admin/dashboard/(components)/sections/DashboardError'
import { UserCreations } from '@/app/u/(components)/UserCreations'
import ProfileCard from '@/app/u/(components)/ProfileCard'
import ApiClient from '@/api/fetchClient'
import Loading from '@/app/admin/workspace/(components)/Loading'
import { useUserStore } from '@/stores/user_store'
import AdminView from '@/app/admin/components/AdminView'
import { AutorizedContent } from '@/app/admin/components/context/AutorizedContent'
import Link from 'next/link'

const Page = ({ params }: { params: { nick: string } }) => {
    const [user, setUser] = useState<Omit<UserType, 'password'> | null>(null)
    const [error, setError] = useState<AxiosError<ErrorServerResponse> | null>(
        null
    )
    const { account_data } = useUserStore()
    const nick = params.nick.replace('%40', '@')

    useEffect(() => {
        console.log('user.ts state: ', user?.firstName)
    }, [user])

    const { token } = usePersistStore()

    const api = {
        me: useMutation({
            mutationKey: ['me'],
            mutationFn: (token: string) => {
                return ApiClient.get('/private/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            },
            onSuccess: (
                response: AxiosResponse<Omit<UserType, 'password'>>
            ) => {
                setUser(response.data)
            },
            onError: (error: AxiosError<ErrorServerResponse>) => {
                setError(error)
            },
        }),
        user: useMutation({
            mutationKey: ['fetch-public-user'],
            mutationFn: (nickName: string) => {
                return ApiClient.get(`/user/get?nick=${nickName}`)
            },
            onSuccess: (
                response: AxiosResponse<Omit<UserType, 'password'>>
            ) => {
                setUser(response.data)
            },
            onError: (error: AxiosError<ErrorServerResponse>) => {
                setError(error)
            },
        }),
    }

    useEffect(() => {
        console.log(`Nick: ${nick}`)
        if (nick === '@me') {
            api.me.mutate(token)
        } else {
            console.log('Nick: ', nick)
            api.user.mutate(nick.slice(1))
        }
    }, [])

    const checkAccessPower = (
        currentAccount: typeof account_data,
        user: Omit<UserType, 'password'>
    ): AccessPower => {
        if (!currentAccount) {
            return 'user'
        }
        if (currentAccount?.role === 'Admin') {
            return 'admin'
        }
        if (currentAccount?._id === user._id) {
            return 'secure'
        }
        return 'user'
    }

    if (error) {
        return (
            <div className="text-white mt-[150px]">
                <DashboardError
                    title={error?.response?.data.error}
                    message={error?.response?.data.message}
                    errorCode={402}
                >
                    <Link
                        href="/login"
                        className="text-blue-500 hover:underline"
                    >
                        Go back to login
                    </Link>
                </DashboardError>
            </div>
        )
    }
    if (!user) {
        return <Loading />
    }
    return (
        <div className="text-white">
            <AutorizedContent user={user}>
                <AdminView />
            </AutorizedContent>

            <div className="text-white  mx-auto w-[60%] mt-10">
                <h1 className="text-3xl flex flex-col gap-2 text-white font-bold pb-5">
                    User Profile
                    <span className="text-sm">{`Id: ${user.userId}`}</span>
                </h1>
                <ProfileCard
                    accessPower={checkAccessPower(account_data, user)}
                    {...user}
                />
                {account_data?._id == user._id && (
                    <p className="px-5 text-green-500">This is You</p>
                )}
                <UserCreations />
            </div>
        </div>
    )
}

export default Page
