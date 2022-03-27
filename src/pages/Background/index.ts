import hashtag from '../../assets/img/hash.svg'

const defaultEntries: Item[] = [
	{ type: 'hash', value: 'Dreamcatcher_Comeback' },
	{ type: 'hash', value: 'Dreamcatcher' },
	{ type: 'hash', value: '드림캐쳐' },
	{ type: 'at', value: 'hf_dreamcatcher' },
	{ type: 'hash', value: 'Apocalypse' },
	{ type: 'hash', value: 'Save_us' },
]
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({'hmtItems': defaultEntries}).then(() => {
        chrome.storage.sync.get('hmtItems').then((data) => {
            console.log(data)
            console.log('hash:')
            console.log(typeof hashtag)
        })
    })
})

//const scripts = chrome.runtime.getManifest().content_scripts?.[0]