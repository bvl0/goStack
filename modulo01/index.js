const express = require('express');

const server = express();
server.use(express.json());

const users=['diego', 'robson', 'vitor'];

function checkUser(req,res,next){
  if(!req.body.user){
    return res.status(420).json({error: "user name is required"});
  }
  return next();
}

function checkUsersInArray(req,res,next){
  if(!users[req.params.index]){
    return res.status(420).json({error: "user index dont exist"});
  }
  return next();
}

server.get('/users',(req,res) => {
  return res.json(users);
})

server.get('/users/:index',checkUsersInArray,(req,res) => {
  const {index} = req.params;

  return res.json(users[index]);
})

server.post('/users',checkUser, (req,res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put('/users/:index',checkUser,checkUsersInArray, (req,res) => {
  const {index} = req.params;
  const { name }= req.body;
  users[index] = name;
  return res.json(users);
})

server.delete('/users/:index',checkUsersInArray, (req,res) =>{
  const {index} = req.params;

  users.splice(index, 1);
  return res.json(users);
})

server.listen(3000);