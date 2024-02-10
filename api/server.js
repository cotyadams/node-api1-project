// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model')
const { v4: uuid } = require('uuid');
// creating object
const server = express();

// telling server to parse the JSON in body of request
server.use(express.json());

// request handlers
// get handlers
server.get('/api/users', (req, res) => {
    User.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                message: 'The users information could not be retrieved'
            })
    })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            if (!result) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            }
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json({
                message: 'cannot get user',
                err: err.message
        })
    })
})

// post handlers
server.post('/api/users', (req, res) => {
    User.insert(req.body)
        .then((result) => {
            if (!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            }
            res.status(201).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                message: "There was an error while saving the user to the database"
            })
        })
    
})

// delete handlers
server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then((result) => {
            if (!result) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                });
            }
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                message: "The user could not be removed"
            })
        })  
})

// put handlers
server.put('/api/users/:id', (req, res) => {
    User.update(req.params.id, {
        name: req.body.name,
        bio: req.body.bio
    })
        .then((result) => {
            if (!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            }
            if (!result) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            }
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json({
                message: 'The user information could not be modified'
            })
        })
})

server.listen(8000, () => {console.log('api running')})
module.exports = server; // EXPORT YOUR SERVER instead of {}