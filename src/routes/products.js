const express = require('express')
const router = express.Router()
const productServices = require('../services/products')
const userServices = require('../services/users')
const verifyToken = require('../controllers/verifyToken')


const mongoConnectionProducts = new productServices()
const mongoConnectionUsers = new userServices()
router.get('/products', async (req, res) => {
  console.log("Testing products")
  const products = await mongoConnectionProducts.getProducts()
  res.json({
    data: products,
    message: 'hola'
  })
})


router.post('/vehiculos', verifyToken, async (req, res) => {
  // res.status(200).send(decoded);
  // Search the Info base on the ID
  // const user = await User.findById(decoded.id, { password: 0});
  const user = await mongoConnectionUsers.getUser(req.userId);
  if (!user) {
      return res.status(404).send("No user found.");
  }
  const tipo=user.type
  if(tipo){
    console.log("Es un arrendador y su id es... ", user._id)



  }else{
    console.log("No es un arrendador")
  }

  console.log(user)
  res.status(200).json(user);
});




router.get('/products/:id', async function (req, res, next) {
  const { id } = req.params
  try {
    const product = await mongoConnectionProducts.getProduct(id)
    console.log(product)
    res.status(200).json(
      {
        data: product,
        message: 'users retrieved'
      }
    )
  } catch (error) {
    next(error)
  }
})

router.post('/products', async (req, res) => {
  const {
    nombre,
    valor_unitario,
    unidad_medida,
    cantidad_disponible,
    categoria,
    descripcion,
    images,
    idProductor
  } = req.body
  const user = await mongoConnectionProducts.createProduct({
    nombre,
    valor_unitario,
    unidad_medida,
    cantidad_disponible,
    categoria,
    descripcion,
    images,
    idProductor
  })
  res.json(user)
})

router.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const {
    nombre,
    valor_unitario,
    unidad_medida,
    cantidad_disponible,
    categoria,
    descripcion } = req.body
  const user = await mongoConnectionProducts.updateProduct(id, {
    nombre,
    valor_unitario,
    unidad_medida,
    cantidad_disponible,
    categoria,
    descripcion
  })
  res.json(user)

})

router.delete('/products/:id', async (req, res) => {
  const { id } = req.params
  const user = await mongoConnectionProducts.deleteProduct(id)
  res.json(user)
})


module.exports = router