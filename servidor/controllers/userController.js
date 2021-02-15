const User=require('../models/User')
const {validationResult} =require('express-validator')

exports.createUser=async (req,res)=>{
    //revisar si hay errores
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errores:errors.array()})
    }

    try {
        const user=new User(req.body);
        await user.save();
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error has ocurred in the server")
    }
}

//obtener todas las categorias
exports.getUsers=async(req,res)=>{
    try{
        const users=await User.find()
        res.json(users)
    }catch(error){
        console.log(error)
        res.status(500).send("Error has ocurred in the server")
    }
}


exports.updateUser=async(req,res)=>{
    //extraer la informacion de la categoria
    const {name,email,dni,birthday,updated_at}=req.body
    const newUser={}

    if(name){
        newUser.name=name
    }

    if(email){
        newUser.email=email
    }

    if(dni){
        newUser.dni=dni
    }

    if(birthday){
        newUser.birthday=birthday
    }

    if(updated_at){
        newUser.updated_at=updated_at
    }

    try {
        //revisar el id
        let user=await User.findById(req.params.id)

        //revisar si la categoria existe
        if(!user){
            return res.status(404).json({msg:"User doesnt exist"})
        }

        //actualizamos
        user=await User.findByIdAndUpdate({_id:req.params.id},{$set:newUser},{new:true})

        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json('Error has ocurred in the server')
    }
}

exports.deleteUser=async (req,res)=>{
    try {
        //revisar el id
        let user=await User.findById(req.params.id)

        //revisar si la categoria existe
        if(!user){
            return res.status(404).json({msg:"User doesnt exist"})
        }

        //actualizamos
        user=await User.findOneAndRemove({_id:req.params.id})

        res.json({msg:"User has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Error has ocurred in the server'})
    }
}