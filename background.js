const color = '#3aa757'
chrome.runtime.onInstalled.addListener((details) => {
    console.log(details)
    chrome.storage.sync.set({color})
})