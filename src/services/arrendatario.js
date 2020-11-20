const MongoLib = require('../database')
class ArrendadorService{

  constructor(){
    this.collection='arrendatario'
    this.mongoDB= new MongoLib()
  }

  async createUser(movie){
    const createMovieId= await this.mongoDB.create(this.collection, movie)
    return createMovieId
  }


}
module.exports= ArrendadorService