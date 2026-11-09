import { createResourceCard } from "./results.js";

let resources = [];

const form = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const statusLine = document.getElementById("results-status");
const resultsArea = document.getElementById("results");

fetch("data/resources.json")
    .then((response) => response.json())
    .then((data) => {
        resources = data;
    })
    .catch(() => {
        statusLine.textContent = "Resources could not be loaded. Please try again later.";
    });

function findMatches(text) {
  const words = text.toLowerCase().split(" ").filter((word) => word !== "");
  return resources.filter((resource) => {
    const haystack = (
      resource.title + " " + resource.description + " " + resource.tags.join(" ")
    ).toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

function showResults(text) {
  resultsArea.innerHTML = "";

  if (text.trim() === "") {
    statusLine.textContent = "Search or choose a category to see resources.";
    return;
  }

  const matches = findMatches(text);

  if (matches.length === 0) {
    statusLine.textContent =
      "No resources matched your search. Try different words, check your spelling, or choose a category to browse.";
    return;
  }

  statusLine.textContent = matches.length + " resource(s) found.";
  matches.forEach((resource) => {
    resultsArea.appendChild(createResourceCard(resource));
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showResults(searchInput.value);
});