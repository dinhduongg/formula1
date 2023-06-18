import { Response, Request } from 'express'
import { IDriver } from '../../types/driver'
import Driver from '../../models/driverDetail'

const addDriver = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as IDriver

        // if (!body.year || !body.driverDetail || !body.firstname || !body.lastname) {
        //     return res.status(400).json({ message: 'Data is not correct' })
        // }
    
        const driver: IDriver = new Driver({
            year: body.year,
            firstname: body.firstname,
            lastname: body.lastname,
            driverDetail: body.driverDetail
        })
    
        await driver.save()
    
        return res
          .status(201)
          .json({ message: "Driver added success" })
    } catch (error) {
        throw error
    }
}

const getDriverDetail = async (req: Request, res: Response): Promise<any> => {
    try {
        const query = req.query as { year: string, firstname: string, lastname: string }        

        const driver = await Driver.findOne({ year: query.year, firstname: { $regex: query.firstname, $options: 'i' }, lastname: { $regex: query.lastname, $options: 'i' } })

        return res.status(201).json({ data: driver })
    } catch (error) {
        throw error
    }
}

export { addDriver, getDriverDetail }