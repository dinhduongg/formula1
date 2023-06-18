import { Response, Request } from 'express'
import { IAllDriver } from '../../types/driver'
import AllDriver from '../../models/allDriver'

const addListDriver = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as IAllDriver

        // if (!body.year || !body.drivers) {
        //     return res.status(400).json({ message: 'Data is not correct' })
        // }
    
        const allDriver: IAllDriver = new AllDriver({
            year: body.year,
            drivers: body.drivers,
            names: body.names
        })
    
        await allDriver.save()

        return res
          .status(201)
          .json({ message: "Driver added success" })
    } catch (error) {
        throw error
    }
}

const getListDriver = async (req: Request, res: Response): Promise<any> => {
    try {
        const query = req.query as { year: string }
        
        const drivers = await AllDriver.findOne({ year: query.year })

        return res.status(201).json({ data: drivers })
    } catch (error) {
        throw error
    }
}

export { addListDriver, getListDriver }