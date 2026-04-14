export function setLocalStorage(storage, data) {
    localStorage.setItem(storage, JSON.stringify(data));
}

export function getLocalStorage(storage) {
    const item = localStorage.getItem(storage);
    return JSON.parse(item);
}

