const { registerValidate, loginValidate, userUpdateValidate } = require('../middleware/validate.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel.js')
class userController {

    getAllUsers = (req, res) => {
        userModel.find().exec((err, users) => {
            if (err) {
                res.send("Khong the lay thong tin users");
            } else {
                console.log("Lay thanh cong thong tin tat ca users");
                console.log(users);
                res.send({ total: userModel.length, users });
            }
        });
    };
    getUserById = (req, res) => {
        userModel.find({ _id: req.params.id }).exec((error, users) => {
            if (error) {
                res.send('khong the lay thong tin user')
            } else {
                console.log("lay thanh cong thong tin user")
                console.log(users)
                res.send(users)
            }
        })
    }
    getUserByName = (req, res) => {
        userModel.find({ name: req.params.name }).exec((error, users) => {
            if (er) {
                res.send('khong the lay thong tin user')
            } else {
                console.log("lay thanh cong thong tin user")
                console.log(users)
                res.send(users)
            }
        })
    }
    getTotalUsers = (req, res) => {
        userModel.countDocuments((error, total) => {
            if (error) {
                res.send('loi lay tong so user')
            } else { res.send(`co ${total} user`) }
        })
    }
    updateUserById = (req, res) => {
        const { error, value } = userUpdateValidate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        userModel.findByIdAndUpdate(
            { _id: req.params.id },
            value,
            { new: true },
            (error) => {
                if (error) {
                    res.send('da xay ra loi khi update')
                } else { res.send('update thanh cong') }
            }

        )
    }

    deleteUserById = (req, res) => {
        userModel.findOneAndDelete({ _id: req.params.id }, (error) => {
            if (error) {
                res.send('error khi delte')
            } else { res.send('xoa thanh cong') }
        })
    }
    register = async (req, res) => {
        const { error } = registerValidate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const emailExists = await userModel.findOne({ email: req.body.email })
        if (emailExists) return res.status(400).send("Email exists in db");


        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(req.body.password, salt)

        const newUser = new userModel()
        newUser.name = req.body.name
        newUser.email = req.body.email
        newUser.password = hashPassword


        try {
            const user = await newUser.save();
            res.send(user);
        } catch (e) {
            console.log("Has Error !!!");
            console.log(e.message);
            res.status(400).send(e);
        }
    }

    login = async (req, res) => {
        const { error } = loginValidate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) return res.status(404).send('khong ton tai user')

        const passwordLogin = await bcrypt.compare(req.body.password, user.password)
        if (!passwordLogin) return res.status(400).send('password error')

        const token = jwt.sign({ id: user._id }, 'chuoibimatkhongthetietlo')
        res.header('auth-token', token).send(token)
    }
    getUserLogin=async(req,res)=>{
        try{
            const user=req.user
            res.send({user})
        }catch(e){
            res.status(400).send(e.details[0].message)
        }
    }

}
module.exports = new userController()