import { IAllDriver } from '../types/driver'
import { model, Schema } from 'mongoose'

const allDriverDetail: Schema = new Schema({
    pos: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    car: {
        type: String,
        required: true
    },
    point: {
        type: String,
        required: true
    },
})

const driverName: Schema = new Schema({
    value: {
        type: String
    },
    label: {
        type: String
    }
})

const allDriverSchema: Schema = new Schema(
    {
        year: {
            type: String,
            required: true
        },
        drivers: [allDriverDetail],
        names: [driverName]
    },
    { timestamps: true }
)

export default model<IAllDriver>('AllDriver', allDriverSchema)