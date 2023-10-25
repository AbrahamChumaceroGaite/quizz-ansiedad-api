function insertResult(idusuario, idquizz, total){
    const queryResult = `INSERT INTO results_a (idusuario, idquizz, total) VALUES (?, ?, ?)`
    const valuesResult = [idusuario, idquizz, total]

    return { queryResult, valuesResult }
}

function getResult(idusuario, idquizz){
    const queryResultS = `SELECT * FROM results_a WHERE idusuario = ? AND idquizz = ?`
    const valuesResultS = [idusuario, idquizz]
    return { queryResultS, valuesResultS }
}

function updateResult(id, result){
    const queryResult = `UPDATE results_a SET total = ?, fechaA = NOW() WHERE id = ?`
    const valuesResult = [result, id]

    return { queryResult, valuesResult }
}

module.exports = { insertResult, getResult, updateResult }