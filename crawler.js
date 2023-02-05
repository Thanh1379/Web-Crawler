const {JSDOM} = require('jsdom')

async function crawPage(baseURL, currentURL, pages) {
    console.log(`craw at ${currentURL}`)
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if(baseURLObj.hostname !== currentURLObj.hostname) return pages;
    const normCurrentURL = normalizeURL(currentURL)
    if(pages[normCurrentURL] > 0) {
        pages[normCurrentURL]++
        return pages
    }

    pages[normCurrentURL] = 1;

    try {
        const res = await fetch(currentURL)

        if(res.status > 399) {
            console.log(`error with status code ${res.status} on page ${currentURL}`)
            return pages
        }
        const contentType = res.headers.get("content-type")
        if(!contentType.includes('text/html')) {
            console.log(`content type ${contentType}`)
            return pages
        }
        const htmlText = await res.text()
        const urls = getULRsFromHtml(htmlText, baseURL)
        for(const url of urls) {
            pages = await crawPage(baseURL, url, pages)
        }
    } catch (error) {
        console.log(error.message)
    }

    return await pages;
}

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
    getULRsFromHtml,
    crawPage
}
