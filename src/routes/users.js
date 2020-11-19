const express = require('express')
const router = express.Router()
const userServices = require('../services/users')


const mongoConnection = new userServices()
router.get('/users', async (req, res) => {
  const users = await mongoConnection.getUsers()
  res.json({
    data: users,
    message: 'hola'
  })
})

router.get('/users/:id', async function (req, res, next) {
  const {id} = req.params
    try {
      const user = await mongoConnection.getUser( id )
      console.log(user)
      res.status(200).json(
        {
          data: user,
          message: 'users retrieved'
        }
      )
    } catch (error) {
      next(error)
    }
})
router.post('/users/username', async function (req, res, next) {
  const {username, password} = req.body
    try {
      const user = await mongoConnection.getUserByUsername( username )
      res.status(200).json(
        {
          data: user,
          message: 'users retrieved'
        }
      )
    } catch (error) {
      next(error)
    }
})

router.post('/users', async (req, res) => {
  const { name, username, password, email } = req.body
  const user = await mongoConnection.createUser({ name, username, password, email })
  res.json(user)
})

router.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, username, password, email } = req.body
  const user = await mongoConnection.updateUser(id, { name, username, password, email })
  res.json(user)
  
})

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await mongoConnection.deleteUser(id)
  res.json(user)
})


module.exports = router