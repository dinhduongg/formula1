import { Router } from "express"
import { addTeam, getTeamDetail } from '../controllers/teamDetail'

const router: Router = Router()

router.post('/add', addTeam)
router.get('/get-team', getTeamDetail)

export default router