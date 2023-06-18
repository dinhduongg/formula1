import { Document } from "mongoose";

export interface IAllDriverDetail extends Document {
    pos: string
    firstname: string
    lastname: string
    nationality: string
    car: string
    point: string
} 

export interface IAllDriver extends Document {
    year: string
    drivers: IAllDriverDetail[]
    names: [{ value: string, label: string }]
}

// for driver detail
export interface IDriverDetail extends Document {
    grandPrix: string
    date: string
    car: string
    racePosition: string
    point: string
}

export interface IDriver extends Document {
    year: string
    firstname: string
    lastname: string
    driverDetail: IDriverDetail[]
}