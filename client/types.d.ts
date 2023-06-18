export interface IAllRaceDetail {
    prix: string
    date: string
    firstname: string
    lastname: string
    car: string
    laps: string
    time: string
}

export interface IAllRace {
    year: string
    races: IAllRaceDetail[]
    names: [{ name: string }]
}

// race result
export interface IRaceResultDetail {
    pos: string
    no: string
    firstname: string
    lastname: string
    car: string
    laps: string
    time_retired: string
    point: string
}

export interface IRaceResult {
    countryName: string
    year: string
    raceResultDetail: IRaceResultDetail[]
}

// fastest lap
export interface IFastestLapDetail {
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

export interface IFastestLap {
    countryName: string
    year: string
    fastestLapDetail: IFastestLapDetail[]
}

// pit stop summary
export interface IPitStopSummaryDetail {
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

export interface IPitStopSummary {
    year: string
    countryName: string
    pitStopSummaryDetail: IPitStopSummaryDetail[]
}

// starting grid
export interface IStartingGridDetail {
    pos: string
    no: string
    firstname: string
    lastname: string
    car: string
    time: string
}

export interface IStartingGrid {
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

export interface IQualifying {
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

export interface IPractice {
    year: string
    countryName: string
    practiceDetail: IPracticeDetail[]
}

// ------------------------------------------------------
export interface IAllDriverDetail {
    pos: string
    firstname: string
    lastname: string
    nationality: string
    car: string
    point: string
} 

export interface IAllDriver {
    year: string
    drivers: IAllDriverDetail[]
    driverName: [{ name: string }]
}

// for driver detail
export interface IDriverDetail {
    grandPrix: string
    date: string
    car: string
    racePosition: string
    point: string
}

export interface IDriver {
    year: string
    firstname: string
    lastname: string
    avg_point: string | number
    driverDetail: IDriverDetail[]
}

// ------------------------------------------------------
export interface IAllTeamDetail {
    pos: string
    team_name: string
    point: string
}

export interface IAllTeam {
    year: string
    teams: IAllTeamDetail[]
    teamName: [{ value: string, label: string }]
}

// for team detail
export interface ITeamDetail {
    grandPrix: string
    date: string
    point: string
}

export interface ITeam {
    year: string
    name: string
    teamDetail: ITeamDetail[]
}

// --------------------------------------------------------
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