export function fadeIn() {
  document.querySelectorAll(".containers").forEach(card => {
    card.classList.add("fade-in");
    setTimeout(() => card.classList.add("show"), 100);
  });
}

export function slideIn() {
  const details = document.getElementById("details-container");
  details.classList.add("slide-in");

  setTimeout(() => {
    details.classList.add("show");
  }, 100);
}

export function pageFade() {
  const page = document.querySelector("#page");
  page.classList.add("fade-page");
  setTimeout(() => page.classList.add("show"), 50);
}

export async function loading(){
  const load = document.querySelector("#loader");
  setTimeout(() => {
    load.classList.add("hidden");
  }, 600);
}



