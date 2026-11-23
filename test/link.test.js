import { readFileSync } from "node:fs";
import { test, expect } from "vitest";

function isTrustedLink(link) {
  try {
    const url = new URL(link);
    const host = url.hostname;
    return (
      url.protocol === "https:" &&
      (host === "txst.edu" || host.endsWith(".txst.edu"))
    );
  } catch {
    return false;
  }
}

test("every resource link is https and on a Texas State address", () => {
  const resources = JSON.parse(readFileSync("./data/resources.json", "utf8"));

  resources.forEach((resource) => {
    expect(isTrustedLink(resource.link), resource.id + " " + resource.link).toBe(true);
  });
});

test("the check rejects links that break the rule", () => {
  expect(isTrustedLink("http://onestop.txst.edu/page.html")).toBe(false);
  expect(isTrustedLink("https://example.com/page.html")).toBe(false);
  expect(isTrustedLink("https://txst.edu.evil.com/page.html")).toBe(false);
  expect(isTrustedLink("not a link")).toBe(false);
});