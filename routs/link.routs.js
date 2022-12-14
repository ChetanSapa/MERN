const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body
        const code = shortid.generate()
        const existing = await Link.findOne({from})
        if (existing){
            return res.json({link: existing})
        }
        const to = baseUrl + '/to/' + code
        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save()
        res.status(201).json({link})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong. Try ones more, please'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        await res.json(links)
    } catch (e) {
        await res.status(500).json({message: 'Something went wrong. Try ones more, please'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        await res.json(link)
    } catch (e) {
        await res.status(500).json({message: 'Something went wrong. Try ones more, please'})
    }
})

module.exports = router