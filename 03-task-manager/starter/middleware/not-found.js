const notFound = (req ,res)=>{
    res.status(404).send("Invalid route access")
}
module.exports= notFound;