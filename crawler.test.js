const {normalizeURL} = require('./crawler.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL', () => {
    const input = 'https://boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing', () => {
    const input = 'https://boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BOOT.dev/path'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://BOOT.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})