# @climba03003/pino

This module is a wrapper for [pino](https://github.com/pinojs/pino) which provide the
ability of enable logger like [debug](https://github.com/visionmedia/debug)

## Install

```
$ npm install @climba03003/pino
```

## Usage

### TypeScript

```ts
import pino from "@climba03003/pino";

const logger = pino("foo");
logger.info("hello world");
```

### JavaScript

```js
const pino = require("@climba03003/pino").default;

const logger = pino("foo");
logger.info("hello world");
```

### Enable Logger

This module default to log level to `silent` which disable logging even if you
specify `DEBUG` option. You must set the `LOG_LEVEL` higher than `silent` inorder
to display log.

```
export LOG_LEVEL=info
export DEBUG=foo
```
