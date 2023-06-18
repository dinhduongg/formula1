import { Document } from "mongoose";

export interface IAllRaceDetail extends Document {
    prix: string
    date: string
    firstname: string
    lastname: string
    car: string
    laps: string
    time: string
}

export interface IAllRace extends Document {
    year: string
    races: IAllRaceDetail[]
    names: [{ value: string, label: string }]
}

// race result
export interface IRaceResultDetail extends Document {
    pos: string
    no: string
    firstname: string
    lastname: string
    car: string
    laps: string
    time_retired: string
    point: string
}

export interface IRaceResult extends Document {
    countryName: string
    year: string
    raceResultDetail: IRaceResultDetail[]
}

// fastest lap
export interface IFastestLapDetail extends Document {
    pos: string
    no: string
    firstname: string
    lastname: string
    car: string
    lap: string
    time_of_day: string
    time: string
    avg_speed: string
}

export interface IFastestLap extends Document {
    countryName: string
    year: string
    fastestLapDetail: IFastestLapDetail[]
}

// pit stop summary
export interface IPitStopSummaryDetail extends Document {
    stops: string
    no: string
    firstname: string
    lastname: string
    car: string
    laps: string
    time_of_day: string
    time: string
    total: string
}

export interface IPitStopSummary extends Document {
    year: string
    countryName: string
    pitStopSummaryDetail: IPitStopSummaryDetail[]
}

// starting grid
export interface IStartingGridDetail extends Document {
    pos: string
    no: string
    firstname: string
    lastname: string
    car: string
    time: string
}

export interface IStartingGrid extends Document {
    year: string
    countryName: string
    startingGridDetail: IStartingGridDetail[]
}

// qualifying
export interface IQualifyingDetail {
    pos: string
    no: string
    firstname: string
    lastname: string
    car: string
    q1: string
    q2: string
    q3: string
    laps: string
}

export interface IQualifying extends Document {
    year: string
    countryName: string
    qualifyingDetail: IQualifyingDetail[]
}

// practice 3, 2, 1
export interface IPracticeDetail {
    pos: string
    no: string
    firstname: string
    lastname: string
    car: string
    time: string
    gap: string
    laps: string
}

export interface IPractice extends Document {
    year: string
    countryName: string
    practiceDetail: IPractice[]
}