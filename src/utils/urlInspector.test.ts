import { describe, expect, it } from "vitest";
import { inspectUrl, type ParsedUrl } from "./urlInspector";

function valid(input: string): ParsedUrl {
  const result = inspectUrl(input);
  expect(result.isValid, input).toBe(true);
  if (result.isValid === false) throw new Error(result.error);
  return result;
}

describe("URL training inspector", () => {
  it.each(["co.uk", "co.jp", "com.au"])("keeps the complete %s public suffix", (suffix) => {
    const result = valid(`https://login.example.${suffix}/konto`);
    expect(result.publicSuffix).toBe(suffix);
    expect(result.domain).toBe(`example.${suffix}`);
    expect(result.subdomain).toBe("login");
  });

  it("separates tenants under a private hosting suffix", () => {
    const result = valid("https://login.unit-test-example.github.io/");
    expect(result.domain).toBe("unit-test-example.github.io");
    expect(result.publicSuffix).toBe("github.io");
    expect(result.subdomain).toBe("login");
    expect(result.isPrivateSuffix).toBe(true);
  });

  it("uses the actual host after @ and does not repeat URL credentials", () => {
    const result = valid("https://bank.example:training-only@account.example.com/login");
    expect(result.hostname).toBe("account.example.com");
    expect(result.domain).toBe("example.com");
    expect(result.hasUserInfo).toBe(true);
    expect(result.notes.some((note) => note.code === "userinfo")).toBe(true);
    expect(JSON.stringify(result)).not.toContain("training-only");
    expect(JSON.stringify(result)).not.toContain("bank.example");
  });

  it("also explains empty userinfo that the browser normalizes away", () => {
    expect(valid("https://@example.com/").hasUserInfo).toBe(true);
  });

  it.each([
    ["https://192.0.2.1:8443/path", "192.0.2.1", "ipv4"],
    ["https://[2001:db8::1]:8443/path", "[2001:db8::1]", "ipv6"],
  ])("keeps IP addresses whole: %s", (input, hostname, hostKind) => {
    const result = valid(input);
    expect(result.hostname).toBe(hostname);
    expect(result.hostKind).toBe(hostKind);
    expect(result.port).toBe("8443");
    expect(result.domain).toBeNull();
    expect(result.publicSuffix).toBeNull();
    expect(result.subdomain).toBe("");
  });

  it("uses the browser's canonical IPv4 interpretation", () => {
    expect(valid("https://0xc0000201/").hostname).toBe("192.0.2.1");
  });

  it("normalizes Unicode and ASCII IDN input consistently without a brand verdict", () => {
    const unicode = valid("https://bücher.example.org/lesen");
    const ascii = valid("https://xn--bcher-kva.example.org/lesen");
    expect(unicode).toEqual(ascii);
    expect(unicode.isIdn).toBe(true);
    expect(unicode.hostname).toBe("xn--bcher-kva.example.org");
    expect(unicode.notes.some((note) => note.code === "idn")).toBe(true);
  });

  it("does not invent a registrable domain for an unknown or reserved suffix", () => {
    const result = valid("https://shop.training.example/");
    expect(result.hostname).toBe("shop.training.example");
    expect(result.domain).toBeNull();
    expect(result.publicSuffix).toBeNull();
    expect(result.notes.some((note) => note.code === "unknown-suffix")).toBe(true);
  });

  it("distinguishes a bare public suffix from a registrable domain", () => {
    const result = valid("https://co.uk/");
    expect(result.publicSuffix).toBe("co.uk");
    expect(result.domain).toBeNull();
    expect(result.notes.some((note) => note.code === "bare-suffix")).toBe(true);
  });

  it("allows a trailing DNS root dot without changing the domain boundary", () => {
    const result = valid("https://login.example.com./");
    expect(result.hostname).toBe("login.example.com.");
    expect(result.domain).toBe("example.com");
    expect(result.subdomain).toBe("login");
  });

  it.each(["com", "cn", "ru", "xyz"])("does not classify a country or topic suffix as malicious: %s", (suffix) => {
    const result = valid(`https://example.${suffix}/`);
    expect(result.notes).toEqual([]);
  });

  it("shows the assumed scheme and supports an explicit port without a scheme", () => {
    const result = valid("example.com:8443/path?test=1#section");
    expect(result.scheme).toBe("https");
    expect(result.assumedScheme).toBe(true);
    expect(result.hostname).toBe("example.com");
    expect(result.port).toBe("8443");
    expect(result.pathAndQuery).toBe("/path?test=1#section");
  });

  it("accepts a scheme-relative host and local hosts without claiming public registration", () => {
    expect(valid("//example.com/path").assumedScheme).toBe(true);
    const local = valid("localhost:3000/path");
    expect(local.hostname).toBe("localhost");
    expect(local.domain).toBeNull();
  });

  it.each([
    "", "   ", "https://", "https:example.com", "https:///example.com",
    "javascript:alert(1)", "javascript:123", "data:text/plain,test", "mailto:person@example.com",
    "ftp://example.com/", "file:///tmp/example", "/relative/path", "?query", "#fragment",
    "https://exa mple.com", "https://exa\nmple.com", "https://example.com\\@other.example",
    "https://example.com:invalid", "https://[2001:db8::zz]/", "https://a..com/",
  ])("returns an actionable error for unsupported or malformed input: %j", (input) => {
    const result = inspectUrl(input);
    expect(result.isValid).toBe(false);
    if (result.isValid === false) expect(result.error.length).toBeGreaterThan(20);
  });

  it("bounds input size for the training tool", () => {
    expect(inspectUrl(`https://example.com/${"a".repeat(4096)}`).isValid).toBe(false);
  });
});
