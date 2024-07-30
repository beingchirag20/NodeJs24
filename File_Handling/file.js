const fs = require('fs');
const os = require('os');

// Write to a file (commented out)
// fs.writeFileSync('./test.txt', 'Hello World');

// Read from a file
const result = fs.readFileSync('./contacts.txt', "utf-8");
console.log(result);

// Get the number of CPUs
console.log(os.cpus().length);
