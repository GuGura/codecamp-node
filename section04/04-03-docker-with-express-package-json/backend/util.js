export function getToday(){
    const date = new Date();

    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2,'0')}-${date.getDay().toString().padStart(2,'0')}`
}
