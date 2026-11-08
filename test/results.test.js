// @vitest-environment jsdom
import { beforeEach, expect, test } from "vitest";
import { createResourceCard } from "../results.js";

const resource = {
  title: "Graduate Support",
  summary: "Find resources for graduate students.",
  category: "graduate-support",
  url: "https://www.txst.edu/",
  lastChecked: "2026-11-08"
};

let card;

beforeEach(() => {
  card = createResourceCard(resource);
});

test("creates an article with the resource-card class", () => {
  expect(card.tagName).toBe("ARTICLE");
  expect(card.classList.contains("resource-card")).toBe(true);
});

test("displays the resource title as a heading", () => {
  const title = card.querySelector("h3");

  expect(title).not.toBeNull();
  expect(title.textContent).toBe(resource.title);
});

test("displays the summary, category, and last-checked date", () => {
  const paragraphs = Array.from(
    card.querySelectorAll("p"),
    paragraph => paragraph.textContent
  );

  expect(paragraphs).toContain(resource.summary);
  expect(paragraphs).toContain("Category: " + resource.category);
  expect(paragraphs).toContain("Last checked: " + resource.lastChecked);
});

test("creates a resource link with descriptive text", () => {
  const link = card.querySelector("a");

  expect(link).not.toBeNull();
  expect(link.getAttribute("href")).toBe(resource.url);
  expect(link.textContent).toBe("Visit " + resource.title);
});

test("treats resource titles as text instead of HTML", () => {
  const specialResource = {
    ...resource,
    title: "<strong>Graduate Support</strong>"
  };

  const specialCard = createResourceCard(specialResource);

  expect(specialCard.querySelector("h3").textContent)
    .toBe(specialResource.title);

  expect(specialCard.querySelector("strong")).toBeNull();
});