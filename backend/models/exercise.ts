import dayjs, { Dayjs } from "dayjs";

export interface WeightProgression {
    weight: number,
    day: Dayjs,
    reps: number
}

export default class Exercise {
    constructor (
        public name: string, public weekDay: string, 
        public pr: number, public weightProgression: WeightProgression[]) {}
}