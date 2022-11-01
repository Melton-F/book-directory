import User from "./../model/userModel"

const show_All_Users = (req, res)=>{
    User.find()
        .populate("books","bookName")
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

const get_User_By_Id = (req, res)=>{
    User.findById(req.params.id)
        .then(user=>{
            if(!user){
                res.status(404).json({
                    status:"Fail",
                    message:"User not Found"
                })
            }
            res.status(200).json({
                status:"Success",
                user
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err
            })
        })
}

const update_user = (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        .then(doc=>{
            res.status(200).json({
                status:"Success",
                message:"user updated",
                updatedUser:doc
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"fail",
                error:err
            })
        })
}

const delete_user = (req, res)=>{
    User.deleteOne({_id:req.params.id})
        .exec()
        .then(result=>{
            res.status(204).json({
                status:"Success",
                message:"user deleted successfully"
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
    show_All_Users, create_User, get_User_By_Id, delete_user, update_user
}