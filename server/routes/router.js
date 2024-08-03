const express = require('express');
const users = require('../modal/userSchema'); 
const router = express.Router();
const upload = require('../multerConfig');


router.post('/register', (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
  
      const { name, email, mobile, age, work, address, desc } = req.body;
  
      // Check if all required fields are provided
      if (!name || !email || !mobile || !age || !work || !address || !desc) {
        return res.status(400).json('Please fill all the data');
      }
  
      try {
        // Check if the user already exists
        const preuser = await users.findOne({ email: email });
        if (preuser) {
          return res.status(409).json('This user is already present');
        } else {
          // Creating a new user
          const adduser = new users({
            name, email, mobile, age, work, address, desc, image: req.file ? req.file.path : ""
          });
  
          await adduser.save();
          res.status(201).json(adduser);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json('Internal Server Error');
      }
    });
  });

// get user data 

router.get('/getdata', async (req,res)=>{

    try {
        const userdata = await users.find();
      
        res.status(201).json(userdata)
        console.log(userdata);
        
    } catch (error) {
     
        res.status(401).json(error)
    }
})

// get individual user

router.get('/getuser/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Request params:', req.params);
  
     
      const indUser = await users.findById(id);
      console.log('Found user:', indUser);
  
     
      if (!indUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(indUser); 
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal Server Error' }); 
    }
  });


  router.patch('/updateuser/:id', async(req,res)=>{
    try {
        const {id} = req.params

        const updatedeuser = await users.findByIdAndUpdate(id,req.body,{
            new: true
        });
        console.log(updatedeuser);
        res.status(201).json(updatedeuser)
    } catch (error) {
        res.status(422).json(error)
    }

  })


  // delete user

  router.delete('/deleteuser/:id', async (req,res)=>{
    try {
        const {id} = req.params

        const deleteuser = await users.findByIdAndDelete({_id:id});
        console.log(deleteuser);
        res.status(201).json(deleteuser)
    } catch (error) {
        res.status(422).json(error)
    }
  })

module.exports = router;
