import mysql, { Connection } from 'mysql2'

//imposta la connessione con il db
export const connection: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chaletalpi'
})
