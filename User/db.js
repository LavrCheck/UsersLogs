const {Client} = require('pg')

const client = new Client({user: 'postgres', password: 'postgrespw', host: 'localhost', port: 49153})

class User {
    userId
    userName
    password

    constructor(userId, userName, password){
        this.userId
        this.userName
        this.password
    }
}

async function connect() {
    await client.connect()
}

async function initTables() {
    await client.query('CREATE TABLE IF NOT EXISTS users (userID SERIAL PRIMARY KEY, userName TEXT NOT NULL, password TEXT NOT NULL)')
}

async function addUser(user){
    const result = await client.query('INSERT INTO users (userName, password) VALUES ($1, $2) RETURNING', [user.userName, user.password])
    return result.rows[0]
}

async function findUserById(id){
    const result = await client.query('SELECT userId, userName, password FROM users WHERE userId = $1', [id])
    return result.rows[0]
}

async function listUsers() {
    const result = await client.query('SELECT userId, userName, password FROM users')
    return result.rows
}

async function updateUserById(id, user){
    await client.query('UPDATE users SET userName = $1 password = $2 WHERE userId = $3', [user.userName, user.password, id])
}



module.exports = {connect, initTables, addUser, User, findUserById, listUsers, updateUserById}