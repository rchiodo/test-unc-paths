const { Worker, parentPort } = require("worker_threads");
const path = require("path");
const fs = require("fs");
console.log(`First worker started`);

const second_worker_path = path.join(__dirname, "second_worker.js");
const second_worker = new Worker(second_worker_path);

parentPort.on("message", (message) => {
	console.log(`First worker received message: ${JSON.stringify(message)}`);
	
	// Read the file and output results.
	switch (message.type) {
		case 'readFile':
			try {
				console.log(`FirstWorker: Reading file: ${message.path}`);
				fs.readFileSync(message.path);
				console.log('FirstWorker: Success reading file');
			} catch (err) {
				console.log(`FirstWorker: Error reading file: ${err}`);
			}
			break;
		}
	
	// Send message on to the second_worker
	second_worker.postMessage(message);
});
