export interface IComplaint {
    complaintId?: number,
    firstName: string,
    lastName: string,
    email: string,
    complaintCategory: string,
    description: string,
    complaintDate?: Date | string 
}