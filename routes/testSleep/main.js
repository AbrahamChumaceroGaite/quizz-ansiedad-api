const express = require('express');
const router = express.Router();
const { queryDatabase } = require('../shared/shared-query');
const msg = require('../../utils/generic-messages');
const { insertResult, getResult, getResultById  } = require('./query');


router.post("/post", async (req, res) => {
    const { idusuario, codigo, p_1, p_2, p_3, fechaA } = req.body;
    console.log(req.body)
    try {
       const { queryResult, valuesResult } = await insertResult(idusuario, codigo, p_1, p_2, p_3, fechaA);
        await queryDatabase(queryResult, valuesResult);
        res.status(200).json({ mensaje: msg.sucesspost });    
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: msg.errorquery });
    }
});

router.get("/get", async (req, res) => {
    const { idusuario } = req.query;

    try {
       const { queryResultS, valuesResultS } = await getResult(idusuario);
        const result = await queryDatabase(queryResultS, valuesResultS );
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: msg.errorquery });
    }
});

router.get("/getById/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.query)
    try {
       const { queryResultS, valuesResultS } = await getResultById(id);
        const result = await queryDatabase(queryResultS, valuesResultS );
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: msg.errorquery });
    }
});

module.exports = router;