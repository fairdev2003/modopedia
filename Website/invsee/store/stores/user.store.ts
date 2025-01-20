import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '@/types/types'

type UserState = {
    User: Omit<UserType, 'password'>
    userName: string
    isLoggedIn: boolean
}

const initialState: UserState = {
    User: {
        _id: '0',
        userId: '0',
        firstName: 'John',
        lastName: 'Doe',
        backgroundImage: 'none',
        createdAt: '0',
        updatedAt: '0',
        nick: 'Mock',
        email: 'mock@email.com',
        image: 'image',
        role: 'User',
    },
    userName: 'Tadeusz',
    isLoggedIn: false,
}

const userStore = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setUserStore: (
            state,
            action: PayloadAction<Partial<Omit<UserType, 'password'>>>
        ) => {
            state.User = { ...state.User, ...action.payload }
        },
    },
})

export const { setUserName, setIsLoggedIn, setUserStore } = userStore.actions

export default userStore.reducer
