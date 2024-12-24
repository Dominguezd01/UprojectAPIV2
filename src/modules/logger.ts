import pino from 'pino';

import fs = require('fs');
import path = require('path');


// Generate the file name with the current date
const date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
console.log(__dirname)
const baseLogDir = path.resolve("logs");
const logFileName = path.join(baseLogDir, `${date}-app.log`);
console.log(logFileName)
console.log(baseLogDir)

if (!fs.existsSync(baseLogDir)) {
    fs.mkdirSync(baseLogDir, { recursive: true });
}

if (!fs.existsSync(logFileName)) {
    fs.writeFileSync(logFileName, "", { flag: "wx" }); // Create file if it doesn't exist
}
// Create a write stream for the log file
const logFileStream = fs.createWriteStream(logFileName, { flags: 'a' });

// Create two Pino destinations: one for the console and one for the file
const consoleStream = pino.destination(1); // STDOUT
const fileStream = pino.destination(logFileStream);

// Create a Pino logger with multiple streams
const logger = pino(
    {
        level: 'info', // Adjust log level as needed
        timestamp: pino.stdTimeFunctions.isoTime, // ISO timestamp for logs
    },
    pino.multistream([
        { stream: consoleStream }, // Console output
        { stream: fileStream },    // File output
    ])
);


export default logger;  