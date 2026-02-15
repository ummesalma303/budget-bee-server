import { Pool } from 'pg'

const pool = new Pool({
    database: 'expenseDB',
    host: 'localhost',
    port: 5050,
    user: 'umme_salma'
})

export default pool
