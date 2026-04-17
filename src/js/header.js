// src/js/header.js

document.addEventListener("DOMContentLoaded", () => {
  // Fetch the header HTML content and inject it into the page
  fetch("/partials/header.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("main-header").innerHTML = html;
    })
    .catch((error) => {
      console.log("Error loading the header:", error);
    });
});
