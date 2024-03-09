const mongoose = require('mongoose');
const dotenv=require("dotenv")
dotenv.config()

mongoose.connect(process.env.BD_CONEXION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('MongoDB Conexion correcta.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});
// Connect MongoDB at default port 27017.