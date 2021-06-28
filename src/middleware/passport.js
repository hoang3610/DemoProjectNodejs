const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const { JWT_SECRET } = require('../configs/index')
const LocalStrategy = require('passport-local').Strategy

const UserModel = require('../models/user.model')

passport.use( new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await UserModel.findById(payload.sub)

        if(!user) return done(null, false)

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

//passport Local
passport.use( new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({email})

        if(!user) return done(null, false)

        // compare password
        const isCorrectPassword = await user.isValidPassword(password)
        
        if(!isCorrectPassword) return done(null, false)

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))