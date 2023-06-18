import { IAllRace } from '../types/race'
import { Schema, model } from 'mongoose'

const allRaceDetail: Schema = new Schema({
    prix: {
        type: String
    },
    date: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    car: {
        type: String
    },
    laps: {
        type: String
    },
    time: {
        type: String
    }
})

const names: Schema = new Schema({
    value: {
        type: String
    },
    label: {
        type: String
    }
})

const allRaceSchema: Schema = new Schema(
    {
        year: {
            type: String,
            required: true
        },
        races: [allRaceDetail],
        names: [names]
    },
    { timestamps: true }
)

export default model<IAllRace>('AllRace', allRaceSchema)