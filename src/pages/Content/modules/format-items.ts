export default function formatItems(object: Item[]): string[] {
    return object.map(item => (item.type === 'at' ? '@' : "#") + item.value)
}