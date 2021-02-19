import { enabled } from '../lib'

describe('enabled', function () {
  const ENV = process.env

  beforeEach(function () {
    jest.resetModules()
    process.env = Object.assign({}, ENV)
  })

  afterEach(function () {
    process.env = ENV
  })

  test('asterisk', function () {
    process.env.DEBUG = '*'
    expect(enabled('@nodejs')).toBeTruthy()
  })

  test('prefix', function () {
    process.env.DEBUG = '@nodejs*'
    expect(enabled('@nodejs')).toBeTruthy()
  })

  test('not match', function () {
    process.env.DEBUG = '@nodejs*'
    expect(enabled('foo')).toBeFalsy()
  })

  test('negative param', function () {
    process.env.DEBUG = '@nodejs*,-@nodejs'
    expect(enabled('@nodejs')).toBeFalsy()
  })

  test('empty param', function () {
    process.env.DEBUG = ''
    expect(enabled('@nodejs')).toBeFalsy()
  })
})
