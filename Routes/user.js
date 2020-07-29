const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../Models/User')
const multer = require('multer')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// jwt encryption key
const jwt_key = 'encrytion'

// body-parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//connecting with database
const database_url = 'mongodb://localhost/api_users_data'
mongoose.connect(database_url)
mongoose.connection.once('open',()=>{
    console.log('connected to database')
}).on('error',(err)=>{
    console.log(err)
})

// file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir+'/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, randomNumber()+'-'+ Date.now())
    }
  })
   
const upload = multer({ storage: storage })

router.get('/all', (req, res)=>{
    User.find().then(users=>{
        res.send(users)
    })
})

router.post('/login',(req,res)=>{
    User.findOne({email : req.body.email})
    .then(user=>{
        if(user==null){
            res.status(404).json({err : 'email not found'})
        }
        bcrypt.compare(req.body.password, user.password, function (err, result){
            if(user){
                jwt.sign({...user,password:null}, jwt_key, (err,token)=>{
                    if(err){
                        res.status(404).json({err : 'somthing went wrong try again later'})
                    }
                    res.status(200).json({user:tocken})
                });
            }
            else{
                res.status(404).json({err : 'password is incorrect'})
            }
        })
    })
})


router.post('/register', upload.single('image'), (req,res)=>{
    User.findOne({email : req.body.email})
    .then(user=>{
        if(user!=null){
            res.status(404).send('email already exists')
        }
    })
    let filename = 'default'
    try{
        filename = req.file.filename
    }
    catch(e){
        console.log('no file is uploaded')
    }
    finally{     
        bcrypt.hash(req.body.password, 10, (err,hash)=>{
            User.create({
                ...req.body,
                password : hash,
                image : filename,
            })
            .then(user=>{
                res.status(200).json({id : user._id})
            })
        })      
    } 
})



module.exports = router;