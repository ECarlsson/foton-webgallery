module.exports = {
  name: "Foton",
  script: "./server.js",
  log_file: "./node.log",
  time: true,
  env: {
    NODE_ENV: "development",
  },
  env_production: {
    NODE_ENV: "production",
    PORT: "3000"
  }
}
