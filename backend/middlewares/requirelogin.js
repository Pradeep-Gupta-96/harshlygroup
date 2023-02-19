module.exports = (res, req, next)=>{
    console.log("hello middleware")
    next()
}