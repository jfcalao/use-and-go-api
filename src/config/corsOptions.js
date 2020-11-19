const whiteList = ["http://192.168.1.12"]

module.exports = {
  origin: function(origin, callback){
    console.log(whiteList.indexOf(origin)==! -1)
    console.log(origin)
    if(whiteList.indexOf(origin)==! -1){
      callback(null,true)
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  }
}
