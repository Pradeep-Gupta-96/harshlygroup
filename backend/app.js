const express = require("express");
const app = express(); // for run

const PORT = 5000;
const cors = require("cors");
app.use(cors())
const {mongoURL} = require("./keys");
const mongoose = require("mongoose");
require("./models/model");
app.use(express.json());
app.use(require("./routes/auth.js"))



mongoose.connect(mongoURL);
mongoose.connection.on("connected", ()=>{
    console.log("sucessfully connected to mongo");
})
mongoose.connection.on("err", ()=>{
    console.log("not connected to mongo");
})

app.use(cors())

//routing




app.listen(PORT, (req, res)=>{
    console.log(`server is running at posrt ${PORT} `)
})