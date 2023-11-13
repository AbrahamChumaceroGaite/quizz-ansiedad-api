const express = require('express');
const router = express.Router();
const { queryDatabase } = require('../shared/shared-query');
const msg = require('../../utils/generic-messages');
const { crearCategoria, obtenerIdCategoria, getResult, deleteResult, updateResult } = require('./query');

router.post('/post', async (req, res) => {
    console.log(req.body);
    const usuario_id = req.body.idusuario;
  
    try {
      const { categoria, notasNuevas, notasExistente } = req.body;
      const categoria_id = await obtenerIdCategoria(categoria);
  
      if (!categoria_id) {
        await crearCategoria(categoria);
        const nuevaCategoriaId = await obtenerIdCategoria(categoria);
        await guardarNotas(usuario_id, nuevaCategoriaId, notasNuevas);
      } else {
        console.log("ID Usuario: " + usuario_id + " ID Categoria: " + categoria_id + " Datos: " + notasNuevas);
        await guardarNotas(usuario_id, categoria_id, notasNuevas);
      }
  
      // Aquí puedes manejar las notas existentes, si es necesario.
  
      console.log('Notas guardadas exitosamente');
      res.status(200).send('Notas guardadas exitosamente');
    } catch (error) {
      console.error('Error al guardar notas: ' + error.message);
      res.status(500).send('Error al guardar notas');
    }
  });
  
router.get("/get", async (req, res) => {
    const { idusuario } = req.query;

    try {
        const { queryResultS, valuesResultS } = await getResult(idusuario);
        const result = await queryDatabase(queryResultS, valuesResultS);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: msg.errorquery });
    }
});

router.put("/put/:id", async (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
   console.log(req.body);

    try {
       const { queryResult, valuesResult } = await updateResult(id, nombre);
        await queryDatabase(queryResult, valuesResult);
        res.json({ mensaje: msg.sucessput });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: msg.errorquery });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
       const { queryResultD, valuesResultD } = await deleteResult(id);
        await queryDatabase(queryResultD, valuesResultD);
        res.json({ mensaje: msg.sucessdelete });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: msg.errorquery });
    }
});


// Función para guardar notas asociadas a una categoría
async function guardarNotas(usuario_id, categoria_id, notas) {
    for (const nota of notas) {
        await queryDatabase('INSERT INTO Notas (idusuario, idcategoria, datos) VALUES (?, ?, ?)', [usuario_id, categoria_id, nota.nombre]);
    }
}



module.exports = router;