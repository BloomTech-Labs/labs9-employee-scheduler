require('dotenv').config()
const cluster = require('cluster')
const os = require('os')
const server = require('./server.js')
const port = process.env.PORT || 9000

if (cluster.isMaster) {
  const cpuCount =
    process.env.WEB_CONCURRENCY ||
    (process.env.NODE_ENV === 'development' && os.cpus().length) ||
    1
  for (let i = 0; i < cpuCount; i++) {
    console.log('spawning child process')
    cluster.fork()
  }
} else {
  server.listen(port, () => console.log(`\n** server up on port ${port} **\n`))
}

cluster.on('exit', worker => {
  console.log('worker exiting')
  cluster.fork()
})
