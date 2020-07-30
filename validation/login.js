const Validator = require('validator');
const isEmpty = require('./is_empty');

const validLogininInput = (data)=> {
	let  errors = {};

	
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	

 	
 	  if (Validator.isEmpty(data.email)){
 	 	errors.email = 'Email field is require'; 
 	 }
 	
 	  if (Validator.isEmpty(data.password)){
 	 	errors.password = 'password field is require'; 
 	 }
 	  if (!Validator.isEmail(data.email)){
 	 	errors.email = 'invlid email'; 
 	 }
 	 return{
 	 	errors:errors,
	 	isValid: isEmpty(errors)  
	 	};
}


 
module.exports = validLogininInput;

