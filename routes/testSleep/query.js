function insertResult(idusuario, codigo, p_1, p_2, p_3, fechaA) {
    const queryResult = `INSERT INTO results_calendar (idusuario, codigo, p_1, p_2, p_3, fechaA) VALUES (?, ?, ?,?,?,?)`
    const valuesResult = [idusuario, codigo, p_1, p_2, p_3, fechaA]

    return { queryResult, valuesResult }
}

function getResult(idusuario) {
    const queryResultS = `SELECT * FROM results_calendar WHERE idusuario = ?`
    const valuesResultS = [idusuario]
    return { queryResultS, valuesResultS }
}

function getResultById(id) {
    const queryResultS = `SELECT * FROM results_calendar WHERE id = ?`
    const valuesResultS = [id]
    return { queryResultS, valuesResultS }
}

module.exports = { insertResult, getResult, getResultById }