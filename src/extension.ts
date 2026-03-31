/**
 * Command Runner - VSCode Extension entry point.
 * Runs configurable terminal commands with file path substitution.
 *
 * @author Eno Yao
 */

import * as vscode from 'vscode';

/** Manages a dedicated terminal for running commands. */
class CommandRunner {
  private terminal: vscode.Terminal | null = null;

  constructor() {
	this.setup();
  }

  /** Run a command in the terminal, creating one if needed. */
  public async runTerminalCommand(command: string): Promise<void> {
	if (!this.terminal) {
	  this.terminal = vscode.window.createTerminal('Command Runner');
	}
	this.terminal.show();
	await vscode.commands.executeCommand('workbench.action.terminal.clear');
	this.terminal.sendText(command);
  }

  /** Send an additional command to the existing terminal. */
  public addTerminalCommand(command: string): void {
	if (this.terminal) {
	  this.terminal.sendText(command);
	}
  }

  /** Listen for terminal close events to reset the reference. */
  private setup(): void {
	vscode.window.onDidCloseTerminal(() => {
	  this.terminal = null;
	});
  }
}

interface CommandRunnerArgs {
  path: string;
}

/**
 * Called when the extension is activated.
 * Registers the command runner command.
 */
export function activate(context: vscode.ExtensionContext): void {
  console.log('Congratulations, your extension "command-runner" is now active!');

  const commandRunner = new CommandRunner();
  const config = vscode.workspace.getConfiguration("command-runner");

  const beforeRunCommand = config.get<string>("before-run-command");
  const runCommand = config.get<string>("run-command");
  const afterRunCommand = config.get<string>("after-run-command");

  const commandRunnerCommand = vscode.commands.registerCommand(
	'command-runner.commandRunner',
	async ({ path }: CommandRunnerArgs) => {
	  if (beforeRunCommand) {
		commandRunner.addTerminalCommand(beforeRunCommand.replace("%FILE_PATH%", path));
	  }
	  if (runCommand) {
		await commandRunner.runTerminalCommand(runCommand.replace("%FILE_PATH%", path));
	  }
	  if (afterRunCommand) {
		commandRunner.addTerminalCommand(afterRunCommand.replace("%FILE_PATH%", path));
	  }
	},
  );

  context.subscriptions.push(commandRunnerCommand);
}

/** Called when the extension is deactivated. */
export function deactivate(): void {
  // No cleanup needed
}
