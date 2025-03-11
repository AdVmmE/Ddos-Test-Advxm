const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`
    \x1b[32m$$\x1b[0m             \x1b[32m$$\x1b[0m
    \x1b[32m$$ |\x1b[0m            \x1b[32m$$ |\x1b[0m
\x1b[33m$$$$$$$ |\x1b[0m       \x1b[33m$$$$$$$ |\x1b[0m       \x1b[36m$$$$$$\\\x1b[0m         \x1b[36m$$$$$$$\\\x1b[0m
\x1b[34m$$  __$$ |\x1b[0m      \x1b[34m$$  __$$ |\x1b[0m      \x1b[35m$$  __$$|\x1b[0m       \x1b[35m$$  _____|\x1b[0m
\x1b[34m$$ /  $$ |\x1b[0m      \x1b[34m$$ /  $$ |\x1b[0m      \x1b[35m$$ /  $$|\x1b[0m      \x1b[32m\\$$$$$$$\\\x1b[0m
\x1b[34m$$ |  $$ |\x1b[0m      \x1b[34m$$ |  $$ |\x1b[0m      \x1b[35m$$ |  $$|\x1b[0m       \x1b[32m\\_____$$\\\x1b[0m
\x1b[34m\\$$$$$$$ |\x1b[0m      \x1b[34m\\$$$$$$$ |\x1b[0m      \x1b[35m\\$$$$$$ |\x1b[0m      \x1b[36m$$$$$$$  |\x1b[0m
 \x1b[34m\\_______|\x1b[0m       \x1b[34m\\_______|\x1b[0m       \x1b[35m\\______|\x1b[0m      \x1b[36m\\_______/\x1b[0m
   \x1b[37m--------------------------------------------\x1b[0m
         \x1b[31mby Advxm\x1b[0m
`);

function simulateTraffic(maxRequests, url, intervalDelay) {
    let requestCount = 0;
    
    console.log(`Starting simulation with ${maxRequests} requests to ${url} every ${intervalDelay}ms`);
    
    const interval = setInterval(() => {
        if (requestCount >= maxRequests) {
            clearInterval(interval);
            console.log("Done simulating!");
            rl.close();
            return;
        }

        fetch(url)
            .then(response => response.text())
            .then(() => console.log(`Request ${requestCount + 1} succeeded`))
            .catch(err => console.log(`Request ${requestCount + 1} failed: ${err}`));
        
        requestCount++;
    }, intervalDelay);
}

function getUserInputs() {
    rl.question('Enter the number of requests to simulate (default: 11100): ', (requests) => {
        const maxRequests = requests ? parseInt(requests) : 11100;
        
        rl.question('Enter the URL to target (default: http://localhost:3000/): ', (url) => {
            const targetUrl = url || 'http://localhost:3000/';
            
            rl.question('Enter the interval delay in milliseconds (default: 50): ', (delay) => {
                const intervalDelay = delay ? parseInt(delay) : 50;
                
                simulateTraffic(maxRequests, targetUrl, intervalDelay);
            });
        });
    });
}

console.log('Traffic Simulator - Enter your preferences:');
getUserInputs();