import { UserRole } from "./role"

export interface IUser {
    id: number
    firstName: string
    lastName: string
    email: string
    birthDate?: string
    userRole: UserRole
    password?: string
    token: string,
}

export type LoginDetails = Pick<IUser, 'email' | 'password'>
