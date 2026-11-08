export function createResourceCard(resource) {
  const card = document.createElement("article");
  card.className = "resource-card";

  const title = document.createElement("h3");
  title.textContent = resource.title;

  const summary = document.createElement("p");
  summary.textContent = resource.summary;

  const category = document.createElement("p");
  category.textContent = "Category: " + resource.category;

  const link = document.createElement("a");
  link.href = resource.link;
  link.textContent = "Visit " + resource.title;

  const lastChecked = document.createElement("p");
  lastChecked.textContent = "Last checked: " + resource.lastChecked;

  card.append(title, summary, category, link, lastChecked);

  return card;
}