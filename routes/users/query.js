
function checkDuplicates(ci){
    const query = `SELECT * FROM usuarios WHERE ci = ?`
    const values = [ci]

    return { query, values }
}


function insertUser(nombre, ci){
    const queryUser = `INSERT INTO usuarios (nombre, ci) VALUES (?, ?)`
    const valuesUser = [nombre, ci]

    return { queryUser, valuesUser }
}

module.exports = {
    checkDuplicates,
    insertUser
}