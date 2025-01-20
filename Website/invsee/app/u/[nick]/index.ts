import { UserType } from '@/types/types'
import { Dispatch, SetStateAction } from 'react'

class IndexUser {
    constructor() {}

    public counter: number = 0
    public user: Omit<UserType, 'password'> | null | undefined
    public setState:
        | Dispatch<SetStateAction<Omit<UserType, 'password'> | null>>
        | undefined

    public init(
        setUser:
            | Dispatch<SetStateAction<Omit<UserType, 'password'> | null>>
            | undefined
    ) {
        this.setState = setUser
    }

    public setNumber(number: number) {
        this.counter = number
    }

    public add(number: number) {
        this.counter = this.counter + number
    }

    public reset(): void {
        this.counter = 0
    }

    public sub(number: number) {
        this.counter = this.counter - number
    }

    public dumpNumber() {
        return this.counter
    }
}

const UserBase = new IndexUser()

export default UserBase
