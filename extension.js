// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require("path");
const { Worker } = require("worker_threads");
const fs = require("fs");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

const first_worker_path = path.join(__dirname, "first_worker.js");
let first_worker;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Start the first worker
	if (!first_worker) {
		first_worker = new Worker(first_worker_path);
	}

	const disposable = vscode.workspace.onDidOpenTextDocument((document) => {
		console.log(`Opened document: ${document.fileName}`);
		first_worker.postMessage({
			type: 'readFile',
			path: document.fileName
		});

		// Read the file and output results.
		try {
			console.log(`Main thread: Reading file: ${document.fileName}`);
			fs.readFileSync(document.fileName);
			console.log('Main thread: Success reading file');
		} catch (err) {
			console.log(`Main thread: Error reading file: ${err}`);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
