const express = require('express')
const router = express.Router()
const productServices = require('../services/products')
const userServices = require('../services/users')
const vehiculosServices = require('../services/vehiculos')
const arrendadorServices = require('../services/arrendador')
const verifyToken = require('../controllers/verifyToken')
const { ObjectId } = require('mongodb')

const mongoConnectionProducts = new productServices()
const mongoConnectionUsers = new userServices()
const mongoConnectionVehiculos = new vehiculosServices()
const mongoConnectionArrendador = new arrendadorServices()
router.get('/products', async (req, res) => {
  console.log("Testing products")
  const products = await mongoConnectionProducts.getProducts()
  res.json({
    data: products,
    message: 'hola'
  })
})
router.post('/vehiculos/register', verifyToken, async (req, res) => {

  const { modelo, descripcion, tipo, año, foto } = req.body
  const user = await mongoConnectionUsers.getUser(req.userId);
  const userId = req.userId

  const objeto = { idUser: (user._id).toString() }
  const arrendador = await mongoConnectionArrendador.getUserWhere(objeto)
  const vehiculoId = await mongoConnectionVehiculos.createVehiculo({ modelo, descripcion, tipo, año, foto, alquilado:false, id_arrendador: arrendador[0]._id })
  console.log("de ", vehiculoId)
  console.log("Este es el arrendador de esa vaina", arrendador)
  arrendador[0].vehiculos.push(vehiculoId.toString())
  console.log("Este es el arrendador de esa vaina", arrendador[0].vehiculos)
  const arren = {
    ...arrendador[0], vehiculos: arrendador[0].vehiculos
  }
  console.log("Este es arren ", arren)
  console.log("Este es arren id ", arrendador[0]._id)

  const newArrendador = await mongoConnectionArrendador.updateUser(arrendador[0]._id, arren)
  const nuevo = await mongoConnectionArrendador.getUser(newArrendador._id)
  res.status(200).json({
    message: "vehiculo agregado correctamente",
    vehiculo: vehiculoId
  })

  console.log("Nuevo arrendador: ", nuevo)
})

router.get('/vehiculos/rented', async (req, res) => {
  const object = {
    alquilado: true
  }
  const vehiculo = await mongoConnectionVehiculos.getVehiculoWhere(object)
  return res.status(200).json({
    state: "ok dador",
    vehiculos: vehiculo,
  });
}
)
router.post('/vehiculos/rent', async (req, res) => {


  const idVehiculo = req.body.id
  vehiculo = await mongoConnectionVehiculos.getVehiculo(idVehiculo)
  const vehi = {
    ...vehiculo,
    alquilado: true
  }
  const newVehiculo = await mongoConnectionVehiculos.updateVehiculo(idVehiculo, vehi)
  res.status(200).json({
    message: "vehiculo alquilado correctamente",
    newVehiculo: newVehiculo

  })
})
router.post('/vehiculos/unrent', async (req, res) => {


  const idVehiculo = req.body.id
  vehiculo = await mongoConnectionVehiculos.getVehiculo(idVehiculo)
  const vehi = {
    ...vehiculo,
    alquilado: false
  }
  const newVehiculo = await mongoConnectionVehiculos.updateVehiculo(idVehiculo, vehi)
  res.status(200).json({
    message: "vehiculo unalquilado correctamente",
    newVehiculo: newVehiculo

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
    const tipo = user.type
    console.log("Este es el tipo", tipo)
    if (tipo === "1") {
      const objeto = { idUser: (user._id) }
      const arrendador = await mongoConnectionArrendador.getUserWhere(objeto)

      console.log("Esto es arrendador posicion cero ", arrendador[0])
      const idVehiculos = arrendador[0].vehiculos
      console.log("Este es id vehiculos", idVehiculos)

      const vehiculos = await Promise.all(idVehiculos.map(async item => {
        console.log("EEste es el item ", ObjectId(item.toString()))
        const object = { _id: ObjectId(item) }
        console.log(object)
        const vehiculo = await mongoConnectionVehiculos.getVehiculoWhere(object)
        return vehiculo
      }))
      let nombreCompleto = `${user.name} ${user.lastname}`
      console.log("Estos son los vehiculos ", vehiculos)
      return res.status(200).json({
        state: "ok dador",
        vehiculos: vehiculos,
        nombreUsuario: nombreCompleto
      });


    } else {
      console.log("No es un arrendador")
      let nombreCompleto = `${user.name} ${user.lastname}`
      const object = {
        alquilado: false
      }
      const vehiculo = await mongoConnectionVehiculos.getVehiculoWhere(object)
      return res.status(200).json({
        state: "ok dador",
        vehiculos: vehiculo,
        nombreUsuario: nombreCompleto
      });

    }

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