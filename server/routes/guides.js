const express = require('express')
const router = express.Router()
require('dotenv').config()
const cors = require('cors')
const connectionsString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionsString)

//fetch guide by selected veggie id provided in guides component
router.get('/:id', async (req, res) => {
    let id = req.params.id
    
    let guide = await db.any('SELECT * FROM vegetables WHERE id = $1', [id])
    
    if (guide) {
        res.json(guide)
    } else {
        res.json({message: "There was an error processing your request"})
    }
    
})

//get zone information by user provided zone in zone component
router.get('/zone-information/:id', async (req, res) => {
    let id = req.params.id
    
    let info = await db.any("SELECT zone_name, TO_CHAR(first_frost, 'MM/DD/YYYY') as first_frost, TO_CHAR(last_frost, 'MM/DD/YYYY') as last_frost, temp from zones WHERE zone_name=$1", [id])

    if (info) {
        res.json(info)
    } else {
        res.json({message: "There was an error processing your request"})
    }
})

module.exports = router