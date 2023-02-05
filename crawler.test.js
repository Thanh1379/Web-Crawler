const {normalizeURL, getULRsFromHtml} = require('./crawler.js')
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

test('getULRsFromHtml absolute', () => {
    const inputHtml = `
    <!DOCTYPE html>
    <html>
    <body>

    <h1>The a element</h1>

    <a href="https://www.w3schools.com">Visit W3Schools.com!</a>

    </body>
    </html>
    `
    const inputURL = 'https://www.w3schools.com'
    const actual = getULRsFromHtml(inputHtml, inputURL)
    const expected = ['https://www.w3schools.com/']
    expect(actual).toEqual(expected)
})

test('getULRsFromHtml relative', () => {
    const inputHtml = `
    <!DOCTYPE html>
    <html>
    <body>

    <h1>The a element</h1>

    <a href="/path/">Visit W3Schools.com!</a>

    </body>
    </html>
    `
    const inputURL = 'https://www.w3schools.com'
    const actual = getULRsFromHtml(inputHtml, inputURL)
    const expected = ['https://www.w3schools.com/path/']
    expect(actual).toEqual(expected)
})

test('getULRsFromHtml both', () => {
    const inputHtml = `
    <!DOCTYPE html>
    <html>
    <body>

    <h1>The a element</h1>

    <a href="https://www.w3schools.com">Visit W3Schools.com!</a>
    <a href="/path/">Visit W3Schools.com!</a>

    </body>
    </html>
    `
    const inputURL = 'https://www.w3schools.com'
    const actual = getULRsFromHtml(inputHtml, inputURL)
    const expected = ['https://www.w3schools.com/','https://www.w3schools.com/path/']
    expect(actual).toEqual(expected)
})

test('getULRsFromHtml invalid', () => {
    const inputHtml = `
    <!DOCTYPE html>
    <html>
    <body>

    <h1>The a element</h1>

    <a href="invalid">Visit W3Schools.com!</a>

    </body>
    </html>
    `
    const inputURL = 'https://www.w3schools.com'
    const actual = getULRsFromHtml(inputHtml, inputURL)
    const expected = []
    expect(actual).toEqual(expected)
})