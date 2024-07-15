

export function formatTimeString(iso: string) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    const editDate = new Date(iso)
    const [hr, min, sec, ampm] = editDate.toLocaleTimeString().split(/[:\s]/g)
    const time = `${hr}:${min} ${ampm}`
    const y = editDate.getFullYear();
    const m = months[editDate.getMonth()];
    const d = editDate.getDate();
    const dow = daysOfWeek[editDate.getDay()];
    return `${time} on ${dow}, ${m} ${d}, ${y}`
}

export const randomString = (n: number): string => {
    const strArray = [];
    for (let i = 0; i < n; i++) {
        let randoms = [String.fromCharCode(Math.floor(Math.random() * 26) + 65), Math.floor(Math.random() * 9)];
        let choice = Math.floor(Math.random() * 2)
        strArray.push(randoms[choice])
    }
    console.log(strArray);
    return strArray.join('')

} 