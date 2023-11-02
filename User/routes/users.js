var express = require('express');
var router = express.Router();
const axios = require('axios')

const {findUserById, addUser, User, updateUserById, listUsers} = require('../db')


/* GET users listing. */
router.post('/', async function(req, res) {
  const body = req.body

  try{
    const createdUser = await addUser(User(body.userId, body.userName, body.password))
    await axios.post('http://localhost:3002/logs',{
      userId: createdUser.userId,
      operation: 'create'
    })
    
  } catch (er) {
    res.status(500)
    res.end()
    return
  }

  res.status(201)
  res.end()
})

router.get('/', async function (req, res) {
  const result = await listUsers()

  try{

    if(!result){
      res.status(404)
      res.end
    }
    res.json(result)
    res.end()

  }catch (er){
    res.status(500)
    res.end()
  }
})

router.patch('/:id', async function(req, res){
  id = req.params.id
  body = req.body

  try{
    await updateUserById(id, User(body.userId, body.userName, body.password))
    const user = await findUserById(id)

    if (!user){
      res.status(404)
      res.end()
      return
    }

    await axios.post('http://localhost:3002/logs',{
      userId: id,
      operation: 'update'
    })
    res.json(user)
    res.end()
  }catch (er){
    res.status(500)
    res.end
  }
})

module.exports = router;
