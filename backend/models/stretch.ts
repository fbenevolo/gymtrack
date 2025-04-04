export class Stretch {
    constructor (
        /* 
            type attribute can either one of two:
            - 'T': time
            - 'R': reps
            
            value can either represent a time or a number of repetitions, depending on the type of stretch
        */
        public name: string, routineNumber: number, type: string, value: number) {}
}