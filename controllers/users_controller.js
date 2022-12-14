const express = require('express')
const users = express.Router()
const mongoose = require('mongoose');
const User = require('../models/userSchema.js')
const bcrypt = require('bcrypt')
  
users.post('/newUser', (req, res) => {
    console.log(req.body)
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
      console.log('user is created', createdUser)
      res.json(createdUser)
    })
})

users.put('/userLogin', (req, res) => {
    console.log(req.body)
    User.findOne({username: req.body.username}, (err, foundUser)=> {
        if (err) {
            console.log(err)
            res.json("There was an error.")
        } else if (!foundUser) {
            res.json("User not found.")
        } else {
         if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            res.json({username: foundUser.username, _id:foundUser._id})
         } else {
            res.json("Passwords do not match.")
        }
}})
})

users.get('/userList', (req, res) => {
    User.find({}, (err, foundUser)=>{
        res.json(foundUser)
    })
})
  
module.exports = users