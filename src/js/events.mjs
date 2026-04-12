import { getLocalStorage, setLocalStorage } from "./storage.mjs";
export function favoriteButtonListener() {
    let favorites = getLocalStorage("favorites") || [];
    const favoriteButtons = document.querySelectorAll("#favorite");
    console.log(favoriteButtons);
    favoriteButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.textContent === "☆") {
                button.textContent = "★"; 
                const items = [button.dataset.id, button.dataset.type];
                favorites.push(items);
                setLocalStorage(favorites);
            } else {
                button.textContent = "☆"; // Change back to empty star
                favorites = favorites.filter(item => item[0] !== button.dataset.id);
                setLocalStorage(favorites);
            }
        });
    }); 
}