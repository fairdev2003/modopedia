import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorServerResponse, UserType } from '@/types/types'

const UserCreations = () => {
    const api = {
        items: useMutation({
            mutationKey: ['user'],
            mutationFn: (token: string) => {
                return axios.get(
                    'http://localhost:9090/honego/v1/private/user/me',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            },
            onSuccess: (
                response: AxiosResponse<Omit<UserType, 'password'>>
            ) => {
                // set state
            },
            onError: (error: AxiosError<ErrorServerResponse>) => {
                // set error state
            },
        }),
    }

    return (
        <div className="flex gap-10 mx-5 mt-5">
            <button>Action2</button>
            <button>Items</button>
            <button>Mods</button>
            <button>Modpacks</button>
        </div>
    )
}

export { UserCreations }
