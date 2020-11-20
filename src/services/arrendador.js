const MongoLib = require('../database')
class ArrendadorService{

  constructor(){
    this.collection='arrendador'
    this.mongoDB= new MongoLib()
  }
  //async getUsers({tags}){
  async getUsers(){
    //const query= tags && {tags: {$in: tags}}
    //const movies= await this.mongoDB.getAll(this.collection,query)
    const movies= await this.mongoDB.getAll(this.collection)
    return movies || []
  }
  async getUser(userId){
    const movie= await this.mongoDB.get(this.collection, userId)
    return movie || {}
  }
  async getUserWhere(objeto){
    const movie= await this.mongoDB.getWhere(this.collection, objeto)
    return movie 
    
  }
  async getUserByUsername(username){
    console.log('MOVIE ID IN MOVIE SERVICE ', username)
    const movie= await this.mongoDB.getUserByUsername(this.collection, username)
    return movie || {}
    
  }
  async createUser(movie){
    const createMovieId= await this.mongoDB.create(this.collection, movie)
    return createMovieId
  }
  async updateUser(movieId, movie){
    
    const updateMovieId= await this.mongoDB.update(this.collection, movieId, movie)
    return updateMovieId
  }
  async deleteUser(movieId){
    const deletedMovieId= await this.mongoDB.delete(this.collection, movieId)
    return deletedMovieId
  }
}
module.exports= ArrendadorService