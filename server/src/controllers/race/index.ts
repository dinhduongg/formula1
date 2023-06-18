import { Response, Request } from "express"
import { IAllRace, IRaceResult, IFastestLap, IPitStopSummary, IStartingGrid, IQualifying, IPractice } from "../../types/race"
import AllRace from '../../models/race'
import RaceResult from "../../models/raceResult"
import FastestLap from "../../models/fastestLap"
import PitStopSummary from "../../models/pitStop"
import StartingGrid from "../../models/startingGrid"
import Qualifying from "../../models/qualifying"
import Practice3 from "../../models/practice3"
import Practice2 from "../../models/practice2"
import Practice1 from "../../models/practice1"

const race = {
    addListRace: async (req: Request, res: Response): Promise<any> => {
        try {
            const body = req.body as IAllRace
            
            const allRace: IAllRace = new AllRace({
                year: body.year,
                races: body.races,
                names: body.names
            })
    
            await allRace.save()
    
            return res
                .status(201)
                .json({ message: "Race added" })
        } catch (error) {
            throw error
        }
    },

    getListRace: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query as { year: string }
            
            const allRace = await AllRace.findOne({year: query.year})
    
            return res.status(201).json({ data: allRace })
        } catch (error) {
            throw error
        }
    },

    addRaceResult: async (req: Request, res: Response): Promise<any> => {
        try {
            const body = req.body as IRaceResult        
    
            const raceResult: IRaceResult = new RaceResult({
                year: body.year,
                countryName: body.countryName,
                raceResultDetail: body.raceResultDetail
            })
    
            await raceResult.save()
    
            return res
                .status(201)
                .json({ message: 'Race result added' })
        } catch (error) {
            return res.status(400).json({ message: 'fail when add RACE RESULT' })
        }
    },

    getRaceResult: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query as { year: string, countryName: string }
    
            const raceResult = await RaceResult.findOne({ year: query.year, countryName: { $regex: query.countryName, $options: 'i' } })
    
            return res.status(201).json({ data: raceResult })
        } catch (error) {
            throw error
        }
    },
    
    addfastestLap: async (req: Request, res: Response): Promise<any> => {
        try {
            const body = req.body as IFastestLap        
    
            const fastestLap: IFastestLap = new FastestLap({
                year: body.year,
                countryName: body.countryName,
                fastestLapDetail: body.fastestLapDetail
            })
    
            await fastestLap.save()
    
            return res
                .status(201)
                .json({ message: 'Fastest lap added' })
        } catch (error) {
            return res.status(400).json({ message: 'fail when add FASTEST LAP' })
        }
    },
    
    getFastetsLap: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query as { year: string, countryName: string }
    
            const fastestLap = await FastestLap.findOne({ year: query.year, countryName: { $regex: query.countryName, $options: 'i' } })
    
            return res.status(201).json({ data: fastestLap })
        } catch (error) {
            throw error
        }
    },
    
    addPitStopSummary: async (req: Request, res: Response): Promise<any> => {
        try {
            const body = req.body as IPitStopSummary        
    
            const pitStopSummary: IPitStopSummary = new PitStopSummary({
                year: body.year,
                countryName: body.countryName,
                pitStopSummaryDetail: body.pitStopSummaryDetail
            })
    
            await pitStopSummary.save()
    
            return res
                .status(201)
                .json({ message: 'PIT STOP SUMMARY added' })
        } catch (error) {
            return res.status(400).json({ message: 'fail when add PIT STOP SUMMARY' })
        }
    },

    getPitStopSummary: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query as { year: string, countryName: string }
        
            const pitStop = await PitStopSummary.findOne({ year: query.year, countryName: { $regex: query.countryName, $options: 'i' } })
    
            return res.status(201).json({ data: pitStop })
        } catch (error) {
            throw error            
        }
    },
    
    addStartingGrid: async (req: Request, res: Response): Promise<any> => {
        try {
            const body = req.body as IStartingGrid        
    
            const startingGrid: IStartingGrid = new StartingGrid({
                year: body.year,
                countryName: body.countryName,
                startingGridDetail: body.startingGridDetail
            })
    
            await startingGrid.save()
    
            return res
                .status(201)
                .json({ message: 'STARTING GRID added' })
        } catch (error) {
            return res.status(400).json({ message: 'fail when add STARTING GRID' })
        }
    },

    getStartingGrid: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query as { year: string, countryName: string }
        
            const startingGrid = await StartingGrid.findOne({ year: query.year, countryName: { $regex: query.countryName, $options: 'i' } })
    
            return res.status(201).json({ data: startingGrid })
        } catch (error) {
            throw error            
        }
    },
    
    addQualifying: async (req: Request, res: Response): Promise<any> => {
        try {
            const body = req.body as IQualifying        
    
            const qualifying: IQualifying = new Qualifying({
                year: body.year,
                countryName: body.countryName,
                qualifyingDetail: body.qualifyingDetail
            })
    
            await qualifying.save()
    
            return res
                .status(201)
                .json({ message: 'QUALIFYING added' })
        } catch (error) {
            return res.status(400).json({ message: 'fail when add QUALIFYING' })
        }
    },

    getQualifying: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query as { year: string, countryName: string }
        
            const qualifying = await Qualifying.findOne({ year: query.year, countryName: { $regex: query.countryName, $options: 'i' } })
    
            return res.status(201).json({ data: qualifying })
        } catch (error) {
            throw error            
        }
    },
    
    addPractice3: async (req: Request, res: Response): Promise<any> => {
        try {
            const body = req.body as IPractice        
    
            const practice: IPractice = new Practice3({
                year: body.year,
                countryName: body.countryName,
                practiceDetail: body.practiceDetail
            })
    
            await practice.save()
    
            return res
                .status(201)
                .json({ message: 'PRACTICE 3 added' })
        } catch (error) {
            return res.status(400).json({ message: 'fail when add PRACTICE 3' })
        }
    },

    getPractice3: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query as { year: string, countryName: string }
        
            const practice3 = await Practice3.findOne({ year: query.year, countryName: { $regex: query.countryName, $options: 'i' } })
    
            return res.status(201).json({ data: practice3 })
        } catch (error) {
            throw error            
        }
    },
    
    addPractice2: async (req: Request, res: Response): Promise<any> => {
        try {
            const body = req.body as IPractice        
    
            const practice: IPractice = new Practice2({
                year: body.year,
                countryName: body.countryName,
                practiceDetail: body.practiceDetail
            })
    
            await practice.save()
    
            return res
                .status(201)
                .json({ message: 'PRACTICE 2 added' })
        } catch (error) {
            return res.status(400).json({ message: 'fail when add PRACTICE 2' })
        }
    },

    getPractice2: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query as { year: string, countryName: string }
        
            const practice2 = await Practice2.findOne({ year: query.year, countryName: { $regex: query.countryName, $options: 'i' } })
    
            return res.status(201).json({ data: practice2 })
        } catch (error) {
            throw error            
        }
    },
    
    addPractice1: async (req: Request, res: Response): Promise<any> => {
        try {
            const body = req.body as IPractice        
    
            const practice: IPractice = new Practice1({
                year: body.year,
                countryName: body.countryName,
                practiceDetail: body.practiceDetail
            })
    
            await practice.save()
    
            return res
                .status(201)
                .json({ message: 'PRACTICE 1 added' })
        } catch (error) {
            return res.status(400).json({ message: 'fail when add PRACTICE 1' })
        }
    },

    getPractice1: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query as { year: string, countryName: string }
        
            const practice1 = await Practice1.findOne({ year: query.year, countryName: { $regex: query.countryName, $options: 'i' } })
    
            return res.status(101).json({ data: practice1 })
        } catch (error) {
            throw error            
        }
    },
}

export default race