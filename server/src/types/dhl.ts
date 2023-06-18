import { Document } from "mongoose";

export interface IDhlDetail {
    grandPrix: string
    firstname: string
    lastname: string
    car: string
    time: string
}

export interface IDhl {
    winner: string
    year: string
    dhlDetail: IDhlDetail[]
}