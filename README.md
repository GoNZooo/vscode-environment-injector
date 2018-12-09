# environment-injector README

Extension for injecting single environment variables into your session and
sourcing/reading `.env` files into it.

*Note: This is mostly an experiment to see how env variables interact with the
different processes in Electron/VS Code.*

## Features

### Inject env variable

Choose an env variable and a value for it; it'll be set in your environment.

### Source an env file

Input a path to a `.env` file, all of it will be read into your environment.

### Get current environment

Get your current environment in an info box to inspect it. Copy the text from the
notification and paste it somewhere to see a non-truncated version.

## Release Notes

### 0.0.1

First release, experimental.