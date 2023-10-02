const { parentPort } = require("worker_threads");
const fs = require("fs");
console.log(`Second worker started`);

parentPort.on("message", (message) => {
	console.log(`Second worker received message: ${JSON.stringify(message)}`);
	// Read the file and output results.
	switch (message.type) {
		case 'readFile':
			try {
				console.log(`SecondWorker: Reading file: ${message.path}`);
				fs.readFileSync(message.path);
				console.log('SecondWorker: Success reading file');
			} catch (err) {
				console.log(`SecondWorker: Error reading file: ${err}`);
			}
			break;
	}
});
