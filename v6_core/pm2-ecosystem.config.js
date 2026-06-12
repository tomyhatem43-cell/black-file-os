module.exports = {
  apps: [
    {
      name: "v6-core-server",
      script: "npx",
      args: "expo start --web --lan",
      cwd: "./apk",
      env: {
        NODE_ENV: "development",
        PORT: 8081
      },
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log"
    }
  ]
};
