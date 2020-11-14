# environment-injector README

Extension for injecting single environment variables into your session and
sourcing/reading `.env` files into it.

## Features

### Inject environment variable

Choose an environment variable, and a value for it; it'll be set in your environment.

### Replace environment variable

Pick from a quicklist of currently defined environment variable, type in a replacement value.

### Source an environment file (Command Palette / File Tree Context Menu)

Input a path to a `.env` file (or access it by right-clicking a file in your
file tree and choosing "Source environment file"), all of it will be read into
your environment.

The file should be formatted as follows:

```
VARIABLE1="some value for variable one here"
OTHER_VARIABLE="42"
...
```

It can also optionally have leading "export" or whitespace and generally be
badly formatted, though with the exception of leading `export` I don't see why
you would have more exotic formatting of an `.env` file.

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

### Output your current environment in the 'Output' panel

Output your current environment to the output panel to inspect it. The panel will
should automatically open.

### Get current environment

Get your current environment in an info box to inspect it. Copy the text from the
notification and paste it somewhere to see a non-truncated version.
