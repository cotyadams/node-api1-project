// BUILD YOUR SERVER HERE
const express = require('express');
const { v4: uuid } = require('uuid');
// creating object
const server = express();

// telling server to parse the JSON in body of request
server.use(express.json());

//example object
// {
//   id: "a_unique_id", // String, required
//   name: "Jane Doe",  // String, required
//   bio: "Having fun", // String, required
// }

// data array
let data = [
    {
        id: uuid(), // String, required
        name: "Jane Doe",  // String, required
        bio: "Having fun", // String, required
    },
    {
        id: uuid(), // String, required
        name: "johnny",  // String, required
        bio: "Having fun", // String, required
    }
]

// request handlers
// get handlers
server.get('/api/users', (req, res) => {
    res.status(200).json(data);
})

server.get('/api/users/:id', (req, res) => {
    res.status(200).json(data.find((user) => (user.id === req.params.id)));
})

// post handlers
server.post('/api/users', (req, res) => {
    data.push({ id: uuid(), name: req.body.name, bio: req.body.bio });
    res.status(201).json(data);
})

// delete handlers
server.delete('/api/users/:id', (req, res) => {
    let deletedUser = {};
    data = [...data.filter((user) => {
        if (user.id === req.params.id) deletedUser = user;
        return user.id !== req.params.id;
    })]
    console.table(data)
    res.status(200).json(deletedUser)
})

server.listen(8000, () => {console.log('api running')})
module.exports = server; // EXPORT YOUR SERVER instead of {}