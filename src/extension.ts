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

// noinspection JSUnusedGlobalSymbols
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const injectCommand = vscode.commands.registerCommand(
    "extension.environment-injector.injectVar",
    async () => {
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
    },
  );

  const readEnvironmentFileCommand = vscode.commands.registerCommand(
    "extension.environment-injector.readEnvFile",
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
    "extension.environment-injector.sourceEnvFile",
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
    "extension.environment-injector.outputCurrentEnv",
    async () => {
      logResults(JSON.stringify(getCurrentEnvironment(), null, 2));
    },
  );

  const getCurrentEnvironmentCommand = vscode.commands.registerCommand(
    "extension.environment-injector.getCurrentEnv",
    async () => {
      vscode.window.showInformationMessage(JSON.stringify(getCurrentEnvironment(), null, 2));
    },
  );

  context.subscriptions.push(injectCommand);
  context.subscriptions.push(readEnvironmentFileCommand);
  context.subscriptions.push(sourceEnvironmentFileCommand);
  context.subscriptions.push(getCurrentEnvironmentCommand);
  context.subscriptions.push(outputCurrentEnvironmentCommand);
}

// this method is called when your extension is deactivated
// noinspection JSUnusedGlobalSymbols
export function deactivate() {}

const getWorkspacePath = (folders: readonly vscode.WorkspaceFolder[] | undefined): vscode.Uri => {
  return folders !== undefined ? folders[0].uri : vscode.Uri.file(".");
};
