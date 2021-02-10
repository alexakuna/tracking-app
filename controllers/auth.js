const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../conf/config');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({seller: req.body.seller})
    if(candidate) {
        if(candidate.token !== '' && req.body.token === '') { //Обязательно переписать на сравнение токенов!!!
            res.status(409).json({message: 'Аккаунт уже используется.'})
        } else {
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
            if(passwordResult) {
                const token = jwt.sign({
                    seller: candidate.seller,
                    userId: candidate._id
                }, keys.jwt, {expiresIn: 3600 * 24})
                candidate.token = token
                await candidate.save()
                res.set('Access-Control-Request-Method', '*')
                res.status(200).json({token: `Bearer ${token}`, shops: candidate.shops, id: candidate._id})
            } else {
                res.status(401).json({message: 'Не верный пароль. Попробуйте еще раз.'})
            }
        }
    } else {
        res.status(404).json({message: 'Пользователя с такими именем нет. Попробуйте еще раз.'})
    }
}
module.exports.logout = async function (req, res) {
    console.log(req.body)
    const candidate = await User.findOne({_id: req.body.id})
    if(candidate) {
        candidate.token = ''
        await candidate.save()
        res.status(200).json({message: 'Success!'})
    } else {
        res.status(500).json({message: 'Error!'})
    }
}
// module.exports.register = async function (req, res) {
//     const candidate = await User.findOne({seller: req.body.seller})
//
//     if (candidate) {
//         res.status(409).json({
//             message: 'Имя занято.'
//         })
//     } else {
//         const salt = bcrypt.genSaltSync(10)
//         const password = req.body.password
//         const user = new User({
//             seller: req.body.seller,
//             password: bcrypt.hashSync(password, salt)
//         })
//         try {
//             await user.save()
//             res.status(201).json(user)
//         } catch (e) {
//             console.log(e)
//             res.status(500).json({message: e.message})
//         }
//     }
// }
