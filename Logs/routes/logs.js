var express = require('express')
var router = express.Router()

const {listLog, addLod} = require('../db')

const pageSize = 5

/* GET users listing. */
router.get('/:id', async function(req, res, next){
    const {id} = req.params
    const page = req.query.page ?? 0

    const rows = await listLog(id, page, pageSize)

    if (rows.length !== 0){
        res.status(200)
        res.json(rows)
        return
    }

    res.status(404)
    res.end()
})

router.post('/', async function (req, res, next) {
    const body = req.body

    await addLod(body)

    res.status(201)
    res.end()
})

module.exports =router