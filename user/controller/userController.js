const User = require('../model/userModel')

const show_All_Users = (req, res)=>{
    User.find()
        .then(users=>{
            if(users<1){
                return res.status(404).json({
                    status:"Fail",
                    message:"There is no users",
                })
            }
            res.status(200).json({
                status:"Success",
                message:"All the users showed",
                no_Of_Users: users.length,
                users
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err
            })
        })
}

const create_User = (req, res)=>{
    const user = new User({
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone,
        email:req.body.email
    })

    user.save().then((doc)=>{
        res.status(201).json({
            status:"Success",
            message:"user created",
            createdUser:doc
        })
    })
    .catch(err=>{
        res.status(400).json({
            status:"Fail",
            error:err
        })
    })
}


module.exports = {
    show_All_Users, create_User
}