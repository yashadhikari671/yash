const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').jwtsecret;
const passport = require('passport');
//load user model
const User = require('../../models/Users')

router.get('/test',(req,res)=>res.json({msg:"user route working"}));

router.post('/register',(req,res)=> {
	
	User.findOne({email: req.body.email }).then(user =>{
		if (user){
			return res.status(400).json({email: 'email already exists'});		
		}
		else{
			const avater = (`https://robohash.org/${req.body.name}?set=set5`);
			const newUser = new User({
				name:req.body.name,
				email:req.body.email,
				avatar:avater,
				password:req.body.password
			});
			bcrypt.genSalt(10,(err, salt)=>{
				bcrypt.hash(newUser.password, salt, (err, hash)=>{
					if(err) throw err;
					newUser.password = hash;
					newUser.save().then(user=> res.json(user))
					.catch(err=> console.log(err));
				})
			})
		}
	})
});

router.post('/signin',(req,res)=>{
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({email}).then(user=>{
		if(!user){
			return res.status(400).json({msg:"email incorrect"})
		}
//comparing password
	
		bcrypt.compare(password , user.password ).then(ismatch=>{console.log(ismatch)
			if(!ismatch){
				res.status(400).json({msg:"password incorrect"})
			}else{
//payload
			const payload ={id:user.id, name:user.name, email:user.email};

//jwt token
			console.log(key)
			jwt.sign(payload, 'key', { expiresIn: 3600 },(err, token) =>{


  				res.json({
  					keys: 'key',
  					msg:"success",
  					token:'JWT ' + token
  				});
		});
	
			}
			})
	})
})

router.get('/current', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send({msg:"hello"});
    }
);



module.exports = router;