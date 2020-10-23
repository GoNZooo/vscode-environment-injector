import { parseEnvironmentFile } from "./environment";

test("`parseBuffer` reads normal environment file correctly", () => {
  const [p1, p2] = parseEnvironmentFile("./normal.env");

  expect(p1).toEqual({ key: "SOME_KEY", value: "some value" });
  expect(p2).toEqual({ key: "SOME_OTHER_KEY", value: "42" });
});

test("`parseBuffer` reads environment file with `export` correctly", () => {
  const [p1, p2] = parseEnvironmentFile("./with-export.env");

  expect(p1).toEqual({ key: "SOME_KEY", value: "some value" });
  expect(p2).toEqual({ key: "SOME_OTHER_KEY", value: "42" });
});

test("`parseBuffer` reads environment file with `export` and very bad formatting correctly", () => {
  const [p1, p2] = parseEnvironmentFile("./with-export-and-bad-formatting.env");

  expect(p1).toEqual({ key: "SOME_KEY", value: "some value" });
  expect(p2).toEqual({ key: "SOME_OTHER_KEY", value: "42" });
});
