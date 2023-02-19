const express=  require("express")
const router  = express.Router();
const mongoose = require("mongoose");
const USER =  mongoose.model("USER")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {Jwt_secret} = require("../keys");
const requirelogin = require("../middlewares/requirelogin");
const Cars =require('../data.js')


router.get("/", (req, res)=>{
    res.send('hellow world')
    
})

router.get("/createpost", requirelogin, (req,res)=>{
console.log("hello auth")
})


router.post("/signup", (req, res)=>{
    
    const {email, password} =req.body;
    if(!email || !password){
        return res.status(422).json({error: "Please fill all the fields"})
    }
    USER.findOne({$or:[{email:email}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exist with the same email or username"})
    }
    bcrypt.hash(password, 12).then((hahsedPassword)=>{

        const user = new USER({
            email,
            password:hahsedPassword
        })
        user.save().then(user=>{res.json({message:"Registered sucessfully"})}).catch(err=>console.log(err))
    })
   
})
    
})


router.post("/signin", (req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({erro:"Please enter email and password"})
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email"})
        }
       bcrypt.compare(password, savedUser.password).then((match)=>{
        if(match){
            // return res.status(200).json({
            //     message:"Signed in sucessfully"
            // })
            const token = jwt.sign({_id:savedUser.id}, Jwt_secret)
            res.json(token);
            console.log(token);
        }
        else{
            return res.status(422).json({
                error:"Invalid Password"
            })
        }
       }).catch(err=>console.log(err))
    })
})

//====CRUD operations

router.get('/api/Cars', (req, res) => {
    res.json(Cars)
})

//===========

router.post('/api/Cars', async (req, res) => {
    const { Name,Prise } = req.body
    if (!Name || !Prise) {
        return res
            .status(400)
            .json({ message: " might be you skip somthing" })
    }
    try {
        const user = {
            "id": Cars.length + 1,
            "Name": req.body.Name,
            "Prise": req.body.Prise,
        }
        Cars.push(user)
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

//=============
router.put('/api/Cars/:id', (req, res) => {
    let { Name, Prise } = req.body
    let id = req.params.id
    
    let index = Cars.findIndex((Cars) => {
        return (Cars.id == Number.parseInt(id))
    })
    if (index >= 0) {
        let CR = Cars[index]
        CR.Name = Name
        CR.Prise = Prise
        res.json(CR)
    } else {
        res.status(404)
        res.end()
    }
})

//==========================
router.delete('/api/Cars/:id', (req, res) => {
    let id = req.params.id;
    let index = Cars.findIndex((Cars) => {
        return (Cars.id == Number.parseInt(id))
    })
    if (index >= 0) {
        let CR=Cars[index]
        Cars.splice(index,1)
        res.json(CR)
    } else {
        res.status(404)
        res.end()
    }
})

module.exports = router;