const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const { URL } = require('url');

// Get the filename from the command line argument
const filename = process.argv[2];

// Check if the filename is provided
if (!filename) {
    console.error('Please provide a filename as a command-line argument.');
    process.exit(1);
}

// Read the file contents asynchronously
fs.readFile(filename, 'utf-8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
    }

    // Split the file contents into an array of URLs
    const urls = data.split('\n').filter(Boolean);

    // Process each URL
    urls.forEach((url) => {
        // Create a URL object to extract the hostname
        const { hostname } = new URL(url);

        // Generate the output filename based on the hostname
        const outputFilename = `${hostname}.txt`;

        // Download the URL and save its content to a file
        downloadUrl(url, outputFilename);
    });
});

// Function to download a URL and save its content to a file
function downloadUrl(url, outputFilename) {
    const protocol = url.startsWith('https') ? https : http;

    // Send a GET request to the URL
    protocol.get(url, (res) => {
        let body = '';

        // Accumulate the response data
        res.on('data', (chunk) => {
            body += chunk;
        });

        // When the response is complete, save the content to a file
        res.on('end', () => {
            fs.writeFile(outputFilename, body, 'utf-8', (err) => {
                if (err) {
                    console.error(`Error writing to file ${outputFilename}: ${err.message}`);
                } else {
                    console.log(`Wrote to ${outputFilename}`);
                }
            });
        });
    }).on('error', (err) => {
        console.error(`Couldn't download ${url}: ${err.message}`);
        fs.appendFile('errors.log', `${url}: ${err.message}\n`, 'utf-8', (err) => {
            if (err) {
                console.error('Error writing to error log:', err.message);
            }
        });
    });
}






