const Home = require('../models/User')

module.exports.getHome = async function (req, res) {
    //console.log(req.body)
    try {
        const data = await Home.findOne({_id: req.body.id})
        res.status(200).json(data.shops)
    } catch (e) {
        res.status(500).json(e)
    }
}
