import { Router } from 'express'
import { getLatest } from '../db'

const router = Router()

router.get('/', (req, res) => {
    // res.json({response: 'Some response'})
    getLatest(res.json)
})

export default router