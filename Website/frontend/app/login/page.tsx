'use client'

import Image from 'next/image'

import { redirect, useRouter } from 'next/navigation'
import Google from '@/assets/google.svg'
import Discord from '@/assets/discord.svg'
import { Eye, EyeOff } from 'lucide-react'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import LoginEngine from '@/app/login/index'
import { AxiosResponse } from 'axios'
import { GoodServerResponse, TokenData } from '@/types/generalTypes'
import { usePersistStore } from '@/stores/persist_store'
import { useUserStore } from '@/stores/user_store'
import Cookies from 'js-cookie'

type LoginElements = {
    email: string
    password: string
    error: string
    loading: boolean
    showpass: boolean
}

const loginEngine = new LoginEngine()

export default function Login() {
    const [loginElements, setLoginElements] = useState<LoginElements>({
        email: '',
        password: '',
        error: '',
        loading: false,
        showpass: false,
    })

    const router = useRouter()

    const { setToken, token } = usePersistStore()
    const { account_data, setAccountData } = useUserStore()

    const passRef = useRef<any>(null)
    const emailRef = useRef<any>(null)

    const data = useMutation<
        AxiosResponse<GoodServerResponse<TokenData>>,
        Error,
        { email: string; password: string }
    >({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string
            password: string
        }) => {
            console.log('email', email)
            console.log('password', password)
            return await loginEngine.Server(email, password)
        },

        onSuccess: (result: AxiosResponse<GoodServerResponse<TokenData>>) => {
            Cookies.set('token', result?.data?.token)
            router.push('/u/@me')
        },
        onError: (error: Error) => {},
    })

    const handleLogin = (email: string, password: string) => {
        data.mutate({ email, password })
    }

    return (
        <div>
            <section className="mt flex items-center justify-center">
                <div className="w-[500px] h-[auto] bg-gray-900/60 rounded-xl p-10">
                    <div className="flex flex-col justify-center gap-4 items-center">
                        <Image
                            className=" select-none"
                            width={75}
                            height={75}
                            src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/a/a4/Grass_Block_%28item%29_BE5.png/revision/latest?cb=20200901112517"
                            alt="grass_block"
                        ></Image>
                        <h2 className="text-white font-[600] text-3xl">
                            Login
                        </h2>
                        <p className="text-white font-[600] text-md">
                            Welcome back!
                        </p>
                    </div>
                    <div className="flex flex-col justify-start mt-[30px] px-10">
                        <p className="text-white mb-2">Email:</p>
                        <div className="flex gap-3 items-center mb-5 h-10 rounded-xl bg-gray-900/90 py-6 px-3 text-white font-[400] w-full">
                            <input
                                ref={emailRef}
                                id="input"
                                autoComplete="off"
                                onChange={(input) => {
                                    setLoginElements({
                                        ...loginElements,
                                        email: input.target.value,
                                    })
                                }}
                                className="bg-transparent outline-none w-full"
                                placeholder="Enter your email"
                                type="email"
                            ></input>
                        </div>
                        <p className="text-white mb-2">Password:</p>
                        <div className="flex gap-3 items-center mb-5 h-10 rounded-xl bg-gray-900/90 py-6 px-3 text-white font-[400] w-full">
                            <input
                                ref={passRef}
                                id="input"
                                autoComplete="off"
                                onChange={(input) => {
                                    setLoginElements({
                                        ...loginElements,
                                        password: input.target.value,
                                    })
                                }}
                                className="bg-transparent outline-none w-full"
                                placeholder="Enter your password"
                                type={
                                    loginElements.showpass ? 'text' : 'password'
                                }
                            ></input>
                            {loginElements.showpass ? (
                                <Eye
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setLoginElements({
                                            ...loginElements,
                                            showpass: !loginElements.showpass,
                                        })
                                    }}
                                ></Eye>
                            ) : (
                                <EyeOff
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setLoginElements({
                                            ...loginElements,
                                            showpass: !loginElements.showpass,
                                        })
                                    }}
                                ></EyeOff>
                            )}
                        </div>
                        {!data.isLoading ? (
                            <button
                                onClick={() => {
                                    handleLogin(
                                        emailRef.current.value,
                                        passRef.current.value
                                    )
                                }}
                                className="bg-gray-900/90 select-none w-full h-[50px] rounded-xl text-white flex items-center justify-center mb-3 gap-3 hover:bg-[#222327] transition-colors"
                            >
                                <p>Sign in</p>
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    handleLogin(
                                        emailRef.current.value,
                                        passRef.current.value
                                    )
                                }}
                                className="bg-gray-900/90 w-full h-[50px] rounded-xl text-white flex items-center justify-center mb-3 gap-3 opacity-30 cursor-default"
                            >
                                <p>Sign in</p>
                            </button>
                        )}
                        {loginElements.error.length > 0 ? (
                            <div className="text-red-500 p-4 font-medium rounded-md bg-red-500/40 border-[1px] h-[50px] border-red-500 flex items-center justify-center mb-3">
                                {loginElements.error}
                            </div>
                        ) : null}
                        <div className="flex gap-2 justify-center items-center">
                            <div className="bg-[#41454d] h-[2px] w-full"></div>
                            <p className="text-white">OR</p>
                            <div className="bg-[#41454d] h-[2px] w-full"></div>
                        </div>
                        <div className="flex flex-col gap-3 justify-center items-center mt-5">
                            <button className="bg-gray-900/90 hover:bg-[#222327] transition-colors w-full h-[50px] rounded-xl text-white flex items-center justify-center gap-3">
                                <div className="flex select-none gap-4 justify-center items-center">
                                    <Image
                                        alt="google"
                                        width={35}
                                        height={35}
                                        src={Discord}
                                    />
                                    <p>Login with Discord</p>
                                </div>
                            </button>
                            <button className="bg-gray-900/90 select-none hover:bg-[#222327] transition-colors w-full h-[50px] rounded-xl text-white flex items-center justify-center gap-3">
                                <div className="flex gap-4 justify-center items-center">
                                    <Image
                                        alt="google"
                                        width={35}
                                        height={35}
                                        src={Google}
                                    />
                                    <p>Login with Google</p>
                                </div>
                            </button>
                            <p className="text-white flex gap-1 mt-3">
                                You dont have an account yet?
                                <Link
                                    href="/register"
                                    className="underline text-blue-500"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
