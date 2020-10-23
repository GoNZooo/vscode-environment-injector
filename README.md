# environment-injector README

Extension for injecting single environment variables into your session and
sourcing/reading `.env` files into it.

## Features

### Inject env variable

Choose an environment variable, and a value for it; it'll be set in your environment.

### Source an env file

Input a path to a `.env` file, all of it will be read into your environment.

Choosing source environment file in the command palette will inject the variables
in that file into your current environment.

The file should be formatted as follows:

```
VARIABLE1="some value for variable one here"
OTHER_VARIABLE="42"
...
```

Since version 0.0.7 it can also optionally have leading "export" or whitespace

```
 VARIABLE1="some value for variable one here"
   export OTHER_VARIABLE="42"
...
```

*Note: Applications/Terminals opened before sourcing a file will not be affected. Be
sure to open applications/terminals after if you want it to get the sourced values
injected. Note that I haven't been able to get powershell to pick up sourced environment
variables at all, though this may be a matter of configuration. I've used it with
WSL & `bash`*

### Get current environment

Get your current environment in an info box to inspect it. Copy the text from the
notification and paste it somewhere to see a non-truncated version.
