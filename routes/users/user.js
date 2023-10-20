const express = require('express');
const router = express.Router();
const { queryDatabase } = require('../shared/shared-query');
const msg = require('../../utils/generic-messages')
const { checkDuplicates, insertUser } = require('./query')

router.post("/post", async (req, res) => {
    const { nombre, ci } = req.body;

    try {
        // Verificar si ya existe un registro con el mismo CI
        const { query, values } = await checkDuplicates(ci);
        const duplicateCheckResults = await queryDatabase(query, values);

        if (duplicateCheckResults.length > 0) {
            return res.json({ mensaje: msg.duplicateuser });
        }

        const { queryUser, valuesUser } = await insertUser(nombre, ci);
        await queryDatabase(queryUser, valuesUser);

        res.json({ mensaje: msg.sucesspost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: msg.errorquery });
    }
});

module.exports = router;
