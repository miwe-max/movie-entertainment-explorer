import { getLocalStorage, setLocalStorage } from "./storage.mjs";
import { pageFade } from "./animation.mjs";

export function favoriteButtonListener() {
    let favorites = getLocalStorage("#favorites") || [];
    const favoriteButtons = document.querySelectorAll("#favorite");
    favoriteButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.textContent == "☆") {
                button.textContent = "★"; 
                
                const items = [button.dataset.id, button.dataset.type];
                console.log(items)
                favorites.push(items);
                setLocalStorage("#favorites", favorites);
                
            } else {
                button.textContent = "☆"; // Change back to empty star
                favorites = favorites.filter(item => item[0] !== button.dataset.id);
                setLocalStorage("#favorites", favorites);
            }
        });
    }); 
}


export function autoplayListener(){
    window.addEventListener("scroll", () => {
        const trailer = document.querySelector("#trailer iframe");
        if (!trailer) return;

        const rect = trailer.getBoundingClientRect();
        const visible = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.2;


        if (visible) {
            const trailerdiv = document.querySelector("#trailer");
            setTimeout(() => {
                trailerdiv.classList.add("visible");
            }, 100);
            trailer.contentWindow.postMessage(JSON.stringify({
                event: "command",
                func: "playVideo"
            }), "*");
        } else {
            trailer.contentWindow.postMessage(JSON.stringify({
                event: "command",
                func: "pauseVideo"
            }), "*");
        }
    });
}

export function mediaCardListener() {
    const cardButtons = document.querySelectorAll("#poster");
    cardButtons.forEach(button => {
        const id = button.dataset.id;
        const type = button.dataset.type;
        button.addEventListener("click", () => {
            pageFade();
            window.location.href = `details.html?id=${id}&type=${type}`;
        });
    })
} 

export function castCardListener() {
    const cardButtons = document.querySelectorAll("#profile");
    cardButtons.forEach(button => {
        const id = button.dataset.id;
        button.addEventListener("click", () => {
            pageFade();
            window.location.href = `details.html?id=${id}`;
        });
    })
} 

export function searchEvent() {
    document.querySelector("#search-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const query = document.querySelector("#search-input").value.trim();
        const genre = document.querySelector("#genreSelect").value;
        if (query || genre) {
          let history = getLocalStorage("#search") || [];
          history.unshift([query, genre])
          history = history.slice(0, 10); 
          setLocalStorage("#search", history);
        }
        pageFade();
        window.location.href = `search.html?search=${encodeURIComponent(query)}&genre=${genre}`;
    });
}

