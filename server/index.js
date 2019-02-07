require('dotenv').config()
const cluster = require('cluster')
const os = require('os')
const server = require('./server.js')
const port = process.env.PORT || 9000

if (cluster.isMaster) {
  const cpuCount = os.cpus().length
  for (let i = 0; i < cpuCount; i++) {
    console.log('spawning child cluster')
    cluster.fork()
  }
} else {
  server.listen(port, () => console.log(`\n** server up on port ${port} **\n`))
}

cluster.on('exit', worker => {
  console.log('worker exiting')
  cluster.fork()
})
