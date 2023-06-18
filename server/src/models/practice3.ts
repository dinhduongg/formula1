import { IPractice } from '../types/race'
import { Schema, model } from 'mongoose'

const practiceDetail: Schema = new Schema({
    pos: {
        type: String
    },
    no: {
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
    time: {
        type: String
    },
    gap: {
        type: String
    },
    laps: {
        type: String
    }
})

const practice3: Schema = new Schema(
    {
        year: {
            type: String,
            required: true
        },
        countryName: {
            type: String,
            required: true
        },
        practiceDetail: [practiceDetail]
    },
    { timestamps: true }
)

export default model<IPractice>('Practice3', practice3)