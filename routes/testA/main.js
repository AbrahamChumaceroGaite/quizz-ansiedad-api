const express = require('express');
const router = express.Router();
const { queryDatabase } = require('../shared/shared-query');
const msg = require('../../utils/generic-messages')
const { insertResult, getResult, updateResult} = require('./query');

router.post("/post", async (req, res) => {
    const { idusuario, idquizz, total } = req.body;

    try {
       const { queryResult, valuesResult } = await insertResult(idusuario, idquizz, total);
        const result = await queryDatabase(queryResult, valuesResult);
        const id = result.insertId;
        res.json(id);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: msg.errorquery });
    }
});

router.get("/get", async (req, res) => {
    const { idusuario, idquizz } = req.query;

    try {
       const { queryResultS, valuesResultS } = await getResult(idusuario, idquizz);
        const result = await queryDatabase(queryResultS, valuesResultS );
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: msg.errorquery });
    }
});

router.put("/put/:id", async (req, res) => {
    const id = req.params.id;
    const {  total } = req.body;

    try {
       const { queryResult, valuesResult } = await updateResult(id, total);
        const result = await queryDatabase(queryResult, valuesResult);
        res.json({ mensaje: msg.sucessput });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: msg.errorquery });
    }
});


module.exports = router;