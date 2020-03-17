const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signIn = async (req, res) => {
        if (!req.body.email || !req.body.password)
            return res.status(400).send('Informe usuário e senha')

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if (!user) return res.status(400).send('Usuário não encontrado')

        if (!bcrypt.compareSync(req.body.password, user.password))
            return res.status(401).send('Senha inválida')

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 dia
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    return { signIn }
}