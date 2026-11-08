// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { test, expect } from "vitest";

test("search input has an associated label", () => {
  const html = readFileSync("./index.html", "utf8");
  const page = new DOMParser().parseFromString(html, "text/html");
  const input = page.querySelector("#search");
  const label = page.querySelector('label[for="search"]');

  expect(input).not.toBeNull();
  expect(input.type).toBe("search");
  expect(label).not.toBeNull();
  expect(label.textContent.trim()).toBe("Search resources");
});