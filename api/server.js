// BUILD YOUR SERVER HERE
const express = require('express');
const uuid = require('uuid');
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
        id: uuid, // String, required
        name: "Jane Doe",  // String, required
        bio: "Having fun", // String, required
    },
]

// request handlers
server.get('/api', (req, res) => {
    console.log('get')
    res.status(200).json(data)
})

// server.post('/api/users', (req, res) => {
//     data.push({id: uuid})
//     res.status(201).json(data)
// })

server.listen(8000, () => {console.log('api running')})
module.exports = server; // EXPORT YOUR SERVER instead of {}