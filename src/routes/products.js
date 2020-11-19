const express = require('express')
const router = express.Router()
const productServices = require('../services/products')


const mongoConnection = new productServices()
router.get('/products', async (req, res) => {
  console.log("Testing products")
  const products = await mongoConnection.getProducts()
  res.json({
    data: products,
    message: 'hola'
  })
})

router.get('/products/:id', async function (req, res, next) {
  const { id } = req.params
  try {
    const product = await mongoConnection.getProduct(id)
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
  const user = await mongoConnection.createProduct({
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
  const user = await mongoConnection.updateProduct(id, {
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
  const user = await mongoConnection.deleteProduct(id)
  res.json(user)
})


module.exports = router