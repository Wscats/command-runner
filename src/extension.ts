import * as vscode from 'vscode';

class CommandRunner {
	private terminal: vscode.Terminal | null;
	constructor() {
		this.terminal = null;
		this.setup();
	}
	public async runTerminalCommand(command: string) {
		if (!this.terminal) {
			this.terminal = vscode.window.createTerminal('dwt');
		}
		this.terminal.show();
		await vscode.commands.executeCommand('workbench.action.terminal.clear');
		this.terminal.sendText(command);
	}
	public addTerminalCommand(command: string) {
		if (this.terminal) {
			this.terminal.sendText(command);
		}
	}
	private setup() {
		vscode.window.onDidCloseTerminal(() => {
			this.terminal = null;
		});
	}
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "dwt-runner" is now active!');
	const commandRunner = new CommandRunner();
	let commandRunnerConfig = vscode.workspace.getConfiguration("command-runner");
	// 预执行的命令
	let beforeRunCommand: string | undefined = commandRunnerConfig.get("before-run-command");
	// 需执行的核心命令
	let runCommand: string | undefined = commandRunnerConfig.get("run-command");
	// 后执行的命令
	let afterRunCommand: string | undefined = commandRunnerConfig.get("after-run-command");
	let commandRunnerCommand = vscode.commands.registerCommand('command-runner.commandRunner', async ({ path }) => {
		beforeRunCommand && commandRunner.addTerminalCommand(`${beforeRunCommand?.replace("%FILE_PATH%", path)}`);
		runCommand && await commandRunner.runTerminalCommand(`${runCommand?.replace("%FILE_PATH%", path)}`);
		afterRunCommand && commandRunner.addTerminalCommand(`${afterRunCommand?.replace("%FILE_PATH%", path)}`);
	});

	context.subscriptions.push(commandRunnerCommand);
}

export function deactivate() { }
