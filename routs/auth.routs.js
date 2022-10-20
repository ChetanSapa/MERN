const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min password length must be six symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }
            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) return res.status(400).json({message: 'The user with that email already exists!'})

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save()
            res.status(201).json({message: 'User created!'})
        } catch (e) {
            res.status(500).json({message: 'Something went wrong. Try ones more, please'})
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Incorrect password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login or password'
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) return res.status(400).json({message: 'User not registered'})

            const isPassMatch = await bcrypt.compare(password, user.password)
            if (!isPassMatch) return res.status(400).json({message: 'Incorrect password'})

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwt'),
                {expiresIn: 60*60}
            )

            await res.json({token, userId: user.id})

        } catch (e) {
            await res.status(500).json({message: 'Something went wrong. Try ones more, please'})
        }
    })
module.exports = router