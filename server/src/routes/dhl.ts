import { Router } from "express"
import { addDhl, getAllDHL } from '../controllers/dhl'

const router: Router = Router()

router.post('/add-dhl', addDhl)
router.get('/get-dhl', getAllDHL)

export default router