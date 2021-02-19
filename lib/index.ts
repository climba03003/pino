import * as Pino from 'pino'

function prepare (): { skips: RegExp[], names: RegExp[] } {
  let namespaces = process.env.DEBUG
  const skips: RegExp[] = []
  const names: RegExp[] = []
  if (typeof namespaces === 'string') {
    const split = namespaces.split(/[\s,]+/)
    for (let i = 0; i < split.length; i++) {
      if (split[i].trim() === '') {
        // ignore empty strings
        continue
      }

      namespaces = split[i].replace(/\*/g, '.*?')

      if (namespaces[0] === '-') {
        skips.push(new RegExp('^' + namespaces.substr(1) + '$'))
      } else {
        names.push(new RegExp('^' + namespaces + '$'))
      }
    }
  }
  return {
    skips,
    names
  }
}

export function enabled (name: string): boolean {
  const { skips, names } = prepare()

  for (let i = 0, len = skips.length; i < len; i++) {
    if (skips[i].test(name)) {
      return false
    }
  }

  for (let i = 0, len = names.length; i < len; i++) {
    if (names[i].test(name)) {
      return true
    }
  }

  return false
}

export function pino (
  name: string,
  option: Pino.LoggerOptions = {},
  stream: Pino.DestinationStream = Pino.destination()
): Pino.Logger {
  const LOG_LEVEL = process.env.LOG_LEVEL ?? 'silent'
  option = Object.assign(
    {
      name,
      level: LOG_LEVEL,
      enabled: enabled(name)
    },
    option
  )
  const logger = Pino(option, stream)
  return logger
}

export default pino
