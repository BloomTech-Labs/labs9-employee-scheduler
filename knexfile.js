module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'cadence',
      user: 'cadence-team',
      password: 'cadence-rocks!'
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './database/seeds' }
  },
  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}`,
    ssl: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './database/seeds' }
  }
}
