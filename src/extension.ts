// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { set, readEnvironmentFile, getCurrentEnvironment } from "./environment";

const outputConsole = vscode.window.createOutputChannel("Environment Injector");

const logResults = (message: string) => {
  outputConsole.appendLine("");

  const parsedMessage = JSON.parse(message);
  for (const name in parsedMessage) {
    if (parsedMessage.hasOwnProperty(name)) {
      outputConsole.appendLine(`${name}=${parsedMessage[name]}`);
    }
  }

  outputConsole.show(true);
};

enum CommandName {
  injectVariable = "extension.environment-injector.injectVariable",
  replaceVariable = "extension.environment-injector.replaceVariable",
  readEnvironment = "extension.environment-injector.readEnvironmentFile",
  sourceEnvironmentFile = "extension.environment-injector.sourceEnvironmentFile",
  outputCurrentEnvironment = "extension.environment-injector.outputCurrentEnvironment",
  getCurrentEnvironment = "extension.environment-injector.getCurrentEnvironment",
}

// noinspection JSUnusedGlobalSymbols
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const injectCommand = vscode.commands.registerCommand(CommandName.injectVariable, async () => {
    const variable = await vscode.window.showInputBox({
      prompt: "Environment variable",
      ignoreFocusOut: true,
    });
    const value = await vscode.window.showInputBox({
      prompt: "Value",
      ignoreFocusOut: true,
    });
    if (variable && value) {
      set(variable, value);
    }
  });

  const replaceVariableCommand = vscode.commands.registerCommand(
    CommandName.replaceVariable,
    async () => {
      const variables = Object.keys(process.env);
      const variableToReplace: string | undefined = await vscode.window.showQuickPick(variables, {
        placeHolder: "Variable to replace",
        ignoreFocusOut: true,
      });
      const newValue: string | undefined = await vscode.window.showInputBox({
        prompt: "New value",
        ignoreFocusOut: true,
      });
      if (variableToReplace !== undefined && newValue !== undefined) {
        set(variableToReplace, newValue);
      }
    },
  );

  const readEnvironmentFileCommand = vscode.commands.registerCommand(
    CommandName.readEnvironment,
    async () => {
      const workspacePath = getWorkspacePath(vscode.workspace.workspaceFolders);

      const environmentFiles = await vscode.window.showOpenDialog({
        filters: { "Environment files": ["env"] },
        openLabel: "Inject",
        defaultUri: workspacePath,
      });

      if (environmentFiles !== undefined) {
        environmentFiles.forEach((file) => readEnvironmentFile(file.fsPath));
      }
    },
  );

  const sourceEnvironmentFileCommand = vscode.commands.registerCommand(
    CommandName.sourceEnvironmentFile,
    async (uriFromContextMenu: vscode.Uri | undefined) => {
      const sourceUri = (uri: vscode.Uri) => {
        outputConsole.appendLine(`Sourcing: ${uri.fsPath}`);
        readEnvironmentFile(uri.fsPath);
      };

      if (uriFromContextMenu !== undefined) {
        sourceUri(uriFromContextMenu);
      } else {
        const workspacePath = getWorkspacePath(vscode.workspace.workspaceFolders);

        const environmentFiles = await vscode.window.showOpenDialog({
          filters: { "Environment files": ["env"] },
          openLabel: "Inject",
          defaultUri: workspacePath,
        });

        if (environmentFiles !== undefined) {
          environmentFiles.forEach((file) => {
            sourceUri(file);
          });
        }
      }
    },
  );

  const outputCurrentEnvironmentCommand = vscode.commands.registerCommand(
    CommandName.outputCurrentEnvironment,
    async () => {
      logResults(JSON.stringify(getCurrentEnvironment(), null, 2));
    },
  );

  const getCurrentEnvironmentCommand = vscode.commands.registerCommand(
    CommandName.getCurrentEnvironment,
    async () => {
      vscode.window.showInformationMessage(JSON.stringify(getCurrentEnvironment(), null, 2));
    },
  );

  context.subscriptions.push(injectCommand);
  context.subscriptions.push(readEnvironmentFileCommand);
  context.subscriptions.push(sourceEnvironmentFileCommand);
  context.subscriptions.push(getCurrentEnvironmentCommand);
  context.subscriptions.push(outputCurrentEnvironmentCommand);
  context.subscriptions.push(replaceVariableCommand);
}

// this method is called when your extension is deactivated
// noinspection JSUnusedGlobalSymbols
export function deactivate() {}

const getWorkspacePath = (folders: readonly vscode.WorkspaceFolder[] | undefined): vscode.Uri => {
  return folders !== undefined ? folders[0].uri : vscode.Uri.file(".");
};
