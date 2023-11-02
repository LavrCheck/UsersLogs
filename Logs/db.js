const {Client} = require('pg')

const client = new Client({user: 'postgres', password: 'postgrespw', host: 'localhost', port: 49153})

class User {
    userId
    userName
    password



    constructor(userId, userName, password) {
        this.userId = userId
        this.userName = userName
        this.password = password
    }
}

async function connect(){
    await client.connect()
}

async function initTables(){
    await client.query('CREATE TABLE IF NOT EXISTS logs (logId SERIAL PRIMARY KEY, userId INT references users (userId), operation TEXT NOT NULL)')
}

async function addLog(log){
    await client.query('INSERT INTO logs (userId, operation) values ($1,$2)', [log.userId, log.operation])
}

async function listLogs(userId, pageNum, pageSize){
    const offset = pageNum * pageSize

    const result = await client.query('SELECT logId, userId, operation FROM logs WHERE userId = $1 ORDER BY logId OFFSET $2 LIMIT $3', [userId, offset, pageSize])
    return result.rows
}



module.exports = {connect, initTables, addLog, listLogs}