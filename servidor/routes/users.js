const express=require('express')
const router=express.Router()
const {check}=require('express-validator')
const userController=require('../controllers/userController')

router.post('/',
[
    check('name','Name is required').notEmpty(),
    check('email','Email is required').notEmpty(),
    check('email',"Email is not valid").isEmail(),
    check('dni','DNI is required').notEmpty(),
    check('birthday','Bithday is required').notEmpty()
],
userController.createUser
)

router.get('/',
userController.getUsers
)


router.put('/:id',
userController.updateUser
)

router.delete('/:id',
userController.deleteUser
)


module.exports=router;