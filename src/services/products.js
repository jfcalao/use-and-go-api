const MongoLib = require('../database')
class ProductService{

  constructor(){
    this.collection='products'
    this.mongoDB= new MongoLib()
  }
  //async getUsers({tags}){
  async getProducts(){
    //const query= tags && {tags: {$in: tags}}
    //const movies= await this.mongoDB.getAll(this.collection,query)
    const movies= await this.mongoDB.getAll(this.collection)
    return movies || []
  }
  async getProduct(productId){
    const movie= await this.mongoDB.get(this.collection, productId)
    return movie || {}
  }
  async getUserByUsername(username){
    console.log('MOVIE ID IN MOVIE SERVICE ', username)
    const movie= await this.mongoDB.getUserByUsername(this.collection, username)
    return movie || {}
    
  }
  async createProduct(movie){
    const createMovieId= await this.mongoDB.create(this.collection, movie)
    return createMovieId
  }
  async updateProduct(movieId, movie= {}){
    const updateMovieId= await this.mongoDB.update(this.collection, movieId, movie)
    return updateMovieId
  }
  async deleteProduct(movieId){
    const deletedMovieId= await this.mongoDB.delete(this.collection, movieId)
    return deletedMovieId
  }
}
module.exports= ProductService