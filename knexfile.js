module.exports = {
  development: {
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
    // debug: true
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
