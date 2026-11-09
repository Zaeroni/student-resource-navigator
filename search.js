import { createResourceCard } from "./results.js";

let resources = [];

const form = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const statusLine = document.getElementById("results-status");
const resultsArea = document.getElementById("results");

fetch("data/resources.json")
  .then((response) => response.json())
  .then((data) => {
    resources = data;
    buildCategoryOptions();
  })
  .catch(() => {
    statusLine.textContent = "Resources could not be loaded. Please try again later.";
  });

function buildCategoryOptions() {
  const categories = [...new Set(resources.map((resource) => resource.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function findMatches(text, category) {
  const words = text.toLowerCase().split(" ").filter((word) => word !== "");
  return resources.filter((resource) => {
    if (category !== "" && resource.category !== category) {
      return false;
    }
    const haystack = (
      resource.title + " " + resource.description + " " + resource.tags.join(" ")
    ).toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

function showResults(text, category) {
  resultsArea.innerHTML = "";

  if (text.trim() === "" && category === "") {
    statusLine.textContent = "Search or choose a category to see resources.";
    return;
  }

  const matches = findMatches(text, category);

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
  showResults(searchInput.value, categorySelect.value);
});

categorySelect.addEventListener("change", () => {
  showResults(searchInput.value, categorySelect.value);
});