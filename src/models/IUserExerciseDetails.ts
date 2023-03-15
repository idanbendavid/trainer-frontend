export interface IUserExerciseDetails{
    id?: number,
    exerciseName: string,
    type: string,
    numberOfSets: number,
    numberOfRepeats: number,
    notes?: string,
    exerciseDate: string,
    duration: number
}