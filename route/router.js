const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt =require('bcrypt')
const createUsers = require('../controller/user')
const jwt = require("jsonwebtoken");
const axios = require ("axios");

router.post('/signin', async (req, res) => {
    await createUsers.createUser(req.body)
    .then((data) => {
       if(data.length) {
          res.send(true)
       } else {
          res.send(false)
       }  
     })
  })

router.get('/get/user/:Name', async () => {
            axios.get("https://api.github.com/users?per_page=10")
            .then((data) => {
                console.log(data)
    })
})
   


 router.get('/get/alluser/:Name', async (req, res) => {
    await knex("user").where('Name',req.params.Name)
    .then((data) => {
       res.send(data)
    })
 })

  router.post("/login", (req, res) => {
    knex("user")
   .where({Email_ID: req.body.Email_ID},{ Password:req.body.Password})
   .first()
   .then(user => {
      if(!user){
         res.status(401).json({
            error:"invalid username or password"
         })
      }
      else{
         return bcrypt
         .compare(req.body.Password, user.Password)
         .then(() => {
               jwt.sign({user},'secret',(err,token) => {
                  res.json({token})
               })
            })
         }
   })
})

   router.post("/verify", (req, res) => {
      const token = req.headers['authorization'].split(" ")[1]
      jwt.verify(token, 'secret', (error, data) => {
         if(error){
            res.status(401).json({
               message: "something went wrong!"
            })
         } else {
               res.status(200).json({
                  message: "welcome to your site",
                  data
               })
            .catch(function (err) {
               console.error(err);
            });
         }
      })
   })





module.exports = router;