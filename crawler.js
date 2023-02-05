const {JSDOM} = require('jsdom')

function getULRsFromHtml(htmlText, baseULR) {
    const dom = new JSDOM(htmlText)
    const urls = []
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements) {
        try {
            let url = '';
            if(linkElement.href[0] === '/') url += (baseULR + linkElement.href)
            else url += linkElement.href
            const urlObj = new URL(url)
            urls.push(urlObj.href)
            
        } catch (error) {
            console.log(`is invalid ${linkElement.href} and ${error.message}`)
        }
        
    }
    return urls
}

function normalizeURL(urlString) {
    let normUrl = '';
    try {
        const urlObj = new URL(urlString)
        normUrl = urlObj.hostname + urlObj.pathname
        if(normUrl.slice(-1) === '/') normUrl = normUrl.slice(0, -1)
    } catch(err) {
        console.log(err.message)
    }
    
    return normUrl
}

module.exports = {
    normalizeURL,
    getULRsFromHtml
}
