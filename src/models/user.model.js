const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    decks: [{
        type: Schema.Types.ObjectId,
        ref: 'Deck'
    }],
    versionKey: false
})

UserSchema.pre('save', async function(next){
    try {
        //generate a salt
        const salt = await bcrypt.genSalt(10)
        //generate a password hash (salt + hash)
        const passwordHashed = await bcrypt.hash(this.password, salt)
        //re-assign password
        this.password = passwordHashed
    } catch (error) {
        next(error)
    }
})

//su dung normal function de co the su dung duoc this. => bai 7 authentication
UserSchema.methods.isValidPassword = async function(newPassword){
    try {
        return await bcrypt.compare(newPassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
}

const User = mongoose.model('User', UserSchema)
module.exports = User