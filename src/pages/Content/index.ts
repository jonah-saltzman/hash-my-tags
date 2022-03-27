import formatItems from './modules/format-items';
import hash from '../../assets/img/hash.svg'
const hashSrc = 'https://i.imgur.com/oiVLsQ8.png'
let items: Item[] = []
console.log('Content script works!')
chrome.storage.sync.get('hmtItems').then((data) => {
	const d = data as SyncStorage
	console.log(d.hmtItems)
    items = d.hmtItems
    elementReady("div.DraftEditor-root span[data-text='true']").then(foundSpan)
})

function foundSpan(span: Element) {
    const s = span as HTMLElement
    console.log('found span:')
    console.log(s)
    const div = document.querySelector('div.DraftEditor-editorContainer')
    if (!div) return
    console.log(div)
    const button = document.createElement('div')
    const img = document.createElement('img')
    img.src = hashSrc
    button.appendChild(img)
    button.classList.add('hmtbutton')
    img.classList.add('hmtimage')
    img.addEventListener('click', () => clicked(button, s))
    div.appendChild(button)
}

function clicked(button: Element, input: HTMLElement) {
    console.log('clicked!')
    const str = '\n' + formatItems(items)
    //console.log(str)
    //input.textContent = input.textContent + str
    input.focus()
    document.dispatchEvent(new KeyboardEvent('keypress', { key: 'a' }))
    button.remove()
}

// const editorRoot = document.querySelector("div.DraftEditor-root") as Node
// console.log('editor root:')
// console.log(editorRoot)
// const config = { attributes: true, childList: true, subtree: true }
// const observer = new MutationObserver((mutations, observer) => {
//     for (const m of mutations) {
//         if (m.target.nodeName === 'SPAN') {
//             console.log(m)
//         }
//     }
// })
// observer.observe(editorRoot, config)


// from https://gist.github.com/jwilson8767/db379026efcbd932f64382db4b02853e
function elementReady(selector: string): Promise<Element> {
	return new Promise((resolve, reject) => {
		let el = document.querySelector(selector)
		if (el) {
			resolve(el)
			return
		}
		new MutationObserver((mutationRecords, observer) => {
			Array.from(document.querySelectorAll(selector)).forEach((element) => {
				resolve(element)
				observer.disconnect()
			})
		}).observe(document.documentElement, {
			childList: true,
			subtree: true,
            attributes: true
		})
	})
}