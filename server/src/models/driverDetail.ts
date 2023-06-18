import { IDriver } from '../types/driver'
import { model, Schema } from 'mongoose'

const driverDetailSchema: Schema = new Schema({
    grandPrix: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    car: {
        type: String,
        required: false
    },
    racePosition: {
        type: String,
        required: false
    },
    point: {
        type: String,
        required: false
    },
})

const driverSchema: Schema = new Schema(
    {
        year: {
            type: String,
            required: false
        },
        firstname: {
            type: String,
            required: false
        },
        lastname: {
            type: String,
            required: false
        },
        driverDetail: [driverDetailSchema]
    },
    { timestamps: true }
)

export default model<IDriver>('Driver', driverSchema)