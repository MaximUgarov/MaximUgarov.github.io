export function replaceNumber(num: string | number): string {
    return `${num}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}