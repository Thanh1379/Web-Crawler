const {crawPage} = require('./crawler.js')

async function main() {
    if(process.argv.length < 3) {
        console.log("no website provided")
        process.exit(1);
    }
    if(process.argv.length > 3) {
        console.log("too many argument provided")
        process.exit(1)
    }
    const currentURL = process.argv[2]
    const pages = await crawPage(currentURL, currentURL, {})

    console.log(pages)
}

main()