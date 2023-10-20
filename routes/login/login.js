const express = require('express');
const router = express.Router();
const { queryDatabase } = require('../shared/shared-query');
const msg = require('../../utils/generic-messages')
const { getLogin, generateToken } = require('./query')

// Endpoint de inicio de sesión
router.post('/post', async (req, res) => {
    const { ci } = req.body;
    try {
        const results = await queryDatabase(getLogin(ci));

        if (results.length > 0) {
            const user = results[0];

            if (ci === user.ci) {
                // Generar un token JWT con los datos del usuario
                const token = await generateToken({
                    iduser: user.id,
                    name: user.nombre,
                    ci: user.ci
                });

                res.json({ token, name: user.nombre,  ci: user.ci});
            } else {
                res.status(500).json({ mensaje: msg.errorlogin });
            }
        } else {
            res.status(500).json({ mensaje: msg.errornonlogin });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: msg.errorquery });
    }
});

module.exports = router;
