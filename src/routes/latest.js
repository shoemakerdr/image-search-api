import { Router } from 'express'
import { getLatest } from '../db'

const router = Router()

router.get('/', (req, res) => {
    getLatest(res)
})

export default router
