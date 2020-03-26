"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { set, readEnvFile, getCurrentEnv } from "./env";

export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let injectCommand = vscode.commands.registerCommand(
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
    }
  );

  let readEnvFileCommand = vscode.commands.registerCommand(
    "extension.environment-injector.readEnvFile",
    async () => {
      const envFile = await vscode.window.showInputBox({
        prompt: "Env file",
        ignoreFocusOut: true,
      });
      if (envFile) {
        readEnvFile(envFile);
      }
    }
  );

  let sourceEnvFileCommand = vscode.commands.registerCommand(
    "extension.environment-injector.sourceEnvFile",
    async () => {
      const envFile = await vscode.window.showInputBox({
        prompt: "Env file",
        ignoreFocusOut: true,
      });
      if (envFile) {
        readEnvFile(envFile);
      }
    }
  );

  let getCurrentEnvCommand = vscode.commands.registerCommand(
    "extension.environment-injector.getCurrentEnv",
    async () => {
      vscode.window.showInformationMessage(JSON.stringify(getCurrentEnv(), null, 2));
    }
  );

  context.subscriptions.push(injectCommand);
  context.subscriptions.push(readEnvFileCommand);
  context.subscriptions.push(sourceEnvFileCommand);
  context.subscriptions.push(getCurrentEnvCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
