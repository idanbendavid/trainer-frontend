import { IUser } from "./IUser"

export type LoginDetails = Pick<IUser, 'email' | 'password'>
