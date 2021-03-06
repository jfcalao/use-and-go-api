const MongoLib = require('../database')
class VehiculosService{

  constructor(){
    this.collection='vehiculos'
    this.mongoDB= new MongoLib()
  }
  //async getUsers({tags}){
  async getVehiculos(){
    //const query= tags && {tags: {$in: tags}}
    //const movies= await this.mongoDB.getAll(this.collection,query)
    const movies= await this.mongoDB.getAll(this.collection)
    return movies || []
  }
  async getVehiculo(userId){
    const movie= await this.mongoDB.get(this.collection, userId)
    return movie || {}
  }
  async getVehiculoWhere(object){
    const movie= await this.mongoDB.getWhere(this.collection, object)
    return movie || {}
    
  }
  async createVehiculo(movie){
    const createMovieId= await this.mongoDB.create(this.collection, movie)
    return createMovieId
  }
  async updateVehiculo(movieId, movie= {}){
    const updateMovieId= await this.mongoDB.update(this.collection, movieId, movie)
    return updateMovieId
  }
  async deleteVehiculo(movieId){
    const deletedMovieId= await this.mongoDB.delete(this.collection, movieId)
    return deletedMovieId
  }
}
module.exports= VehiculosService