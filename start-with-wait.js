const wait = require('wait-for');

wait.for(
  () => {
    try {
      // Check if the MySQL service is reachable
      require('wait-for').waitFor({ port: 3306, host: 'mysql' });
      return true;
    } catch (error) {
      return false;
    }
  },
  () => {
    // Start your Node.js application
    require('child_process').spawn('npm', ['run', 'start'], { stdio: 'inherit' });
  }
);
