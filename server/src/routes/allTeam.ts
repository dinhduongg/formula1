import { Router } from "express"
import { addListTeam, getListTeam } from '../controllers/team'

const router: Router = Router()

router.post('/add-list', addListTeam)
router.get('/get-list-team', getListTeam)

export default router