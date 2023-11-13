const { queryDatabase } = require('../shared/shared-query');

async function obtenerIdCategoria(categoria_nombre) {
    const result = await queryDatabase('SELECT id FROM categorias WHERE nombre = ?', [categoria_nombre]);
    return result.length > 0 ? result[0].id : null;
}


async function crearCategoria(categoria_nombre) {
    await queryDatabase('INSERT INTO Categorias (nombre) VALUES (?)', [categoria_nombre]);
}


async function guardarNota(idusuario, idcategoria, nota) {
    await queryDatabase('INSERT INTO notas (idusuario, idcategoria, datos) VALUES (?, ?, ?)', [idusuario, idcategoria, nota.nombre]);
}


function getResult(idusuario) {
    const queryResultS = `SELECT n.id, n.datos, c.nombre as "categoria" FROM notas n JOIN categorias c ON n.idcategoria = c.id WHERE idusuario = ?`
    const valuesResultS = [idusuario]
    return { queryResultS, valuesResultS }
}

function updateResult(id, result){
    const queryResult = `UPDATE notas SET datos = ? WHERE id = ?`
    const valuesResult = [result, id]

    return { queryResult, valuesResult }
}

function deleteResult(id) {
    const queryResultD = `DELETE FROM notas WHERE id = ?`
    const valuesResultD = [id]
    return { queryResultD, valuesResultD }
}


module.exports = { obtenerIdCategoria, crearCategoria, guardarNota, getResult, deleteResult, updateResult }