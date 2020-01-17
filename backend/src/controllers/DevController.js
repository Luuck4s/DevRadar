const mongoose = require('mongoose')
const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')
mongoose.set('useFindAndModify', false);

module.exports = {
    async index(req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const apiReponse = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = apiReponse.data

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)

            return res.json(dev)

        } else {
            return res.json({ "error": "dev already registered" })
        }
    },

    async update(req, res) {
        const { _id } = req.params

        if (mongoose.Types.ObjectId.isValid(_id)) {
            const { name, bio, techs, latitude, longitude } = req.body
            let updateObject = {}

            if (name) {
                updateObject = { ...updateObject, name }
            }

            if (latitude && longitude) {
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }

                updateObject = { ...updateObject, location }
            }

            if (bio) {
                updateObject = { ...updateObject, bio }
            }

            if (techs) {
                const techsArray = parseStringAsArray(techs)

                updateObject = { ...updateObject, techs: techsArray }
            }


            const dev = await Dev.findOneAndUpdate({
                _id
            }, updateObject)


            if (dev) {
                res.json({ "message": "Dev updated" })
            } else {
                res.json({ "error": "Dev not found" })
            }

        } else {
            res.json({ "error": "Id is not valid" })
        }
    },

    async destroy(req, res) {
        const { _id } = req.params

        if (mongoose.Types.ObjectId.isValid(_id)) {
            const dev = await Dev.findOneAndDelete({
                _id
            })

            if (dev) {
                res.json({ "message": "Sucess dev deleted" })
            } else {
                res.json({ "error": "Dev not found" })
            }

        } else {
            return res.json({ "error": "id is not valid" })
        }
    }
}