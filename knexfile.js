module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/db.sqlite3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './database/seeds' }
  }
}
