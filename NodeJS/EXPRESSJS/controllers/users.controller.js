const model = require('../models/users.model')

console.log( '마냘ㄷ자러마롸며로ㅕㅏㅁㄹㄷ' + model)
console.log(model)
function getUsers(req, res) {
    res.send(model)
    console.log('model타입111: ' + model)
    console.log('model타입111: ' + model[0])
}

function getUser(req, res) {
    const userId = Number(req.params.userId)
    const user = model[userId]
    console.log('userId :  ' + userId)    
    console.log('model타입 :  ' + typeof model)    
    console.log('model :  ' + model)    
    console.log('user :  ' + typeof model[0])
    if(user) {
        res.jsonp(user)
    }else {
        res.sendStatus(404)
    }
}

function postUser(req, res) {
    console.log('req.body.name : ' + req.body.name)

    if(!req.body.name) {
        return res.status(400).json({
            error: "Missing user name"
        })
    }

    const newUser =  {
        name : req.body.name,
        id : model.length
    }
    model.push(newUser)
    res.json(newUser)
}

module.exports = {
    getUser,
    getUsers,
    postUser
}