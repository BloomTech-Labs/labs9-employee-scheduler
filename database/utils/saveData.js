const fs = require('fs')
const knex = require('knex')
const { generateTeamData } = require('./generateData')

const db = knex({
  client: 'sqlite3',
  connection: { filename: '../db.sqlite3' },
  useNullAsDefault: true
  // debug: true
})

async function handle() {
  const { cleanup, team } = await generateTeamData(db, 'small')
  await fs.writeFile('static_seed.json', JSON.stringify(team), console.log)
  await cleanup()
  db.destroy()
}

handle()
