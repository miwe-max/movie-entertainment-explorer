export function setLocalStorage(data) {
    localStorage.setItem("#favorites", JSON.stringify(data));
}

export function getLocalStorage(key) {
    const item = localStorage.getItem("#favorites");
    return JSON.parse(item);
}