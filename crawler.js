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
    normalizeURL
}
