import { UserRole } from "./role"

export interface IUser{
    registerUser: any
    newUser: any
    loginDetails: any
    userId: number
    firstName: string
    lastName: string
    email: string
    password?: string
    birthDate?: Date
    userRole: UserRole
    token: string
    coachId?: string
}
