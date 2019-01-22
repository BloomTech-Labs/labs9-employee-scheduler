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
    client: 'sqlite3',
    connection: { filename: './database/db.sqlite3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './database/seeds' },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
    }
  }
}
